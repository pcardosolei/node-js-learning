const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))


// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Paulo Cardoso'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paulo Cardoso'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        example: 'This is a test example',
        name: 'Paulo Cardoso'
    })
})

app.get('/weather', (req,res) => {
    res.send('Weather Page')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Weather App',
        name: 'Paulo Cardoso'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Weather App',
        name: 'Paulo Cardoso'
    })
})

/* Listening to calls */

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})