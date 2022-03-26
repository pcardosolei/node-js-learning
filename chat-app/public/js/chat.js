const socket = io()

// Elements
const $messageForm = document.getElementById('message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

// location

const $sendLocationButton = document.getElementById('send-location')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // disable
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        
        $messageFormButton.setAttribute('disabled', 'disabled')
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