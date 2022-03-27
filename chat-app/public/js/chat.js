const socket = io()

// Elements
const $messageForm = document.getElementById('message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

// location

const $sendLocationButton = document.getElementById('send-location')

// messages
const $messages = document.getElementById('messages')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true} )

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, { message: message.text, createdAt: moment(message.createdAt).format('h:mm a'), username: message.username })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, { url: message.url, createdAt: moment(message.createdAt).format('h:mm a'), username: message.username });
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // disable
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        // enable
        if(error) {
            return console.log(error)
        }

        console.log('Message Delivered')
    })
});
   

$sendLocationButton.addEventListener('click', (e) => {
    e.preventDefault()
    if(!navigator.geolocation) return alert('geolocation is not supported by your browser')

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared to the server')
        })
    })
})

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error)
        location.href = "/"
    }
})


const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
room,
users })
    document.querySelector('#sidebar').innerHTML = html
})

// auto scroll

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild
     // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
     // Visible height
    const visibleHeight = $messages.offsetHeight
     // Height of messages container
    const containerHeight = $messages.scrollHeight
     // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight
if (containerHeight - newMessageHeight <= scrollOffset) { $messages.scrollTop = $messages.scrollHeight
} }