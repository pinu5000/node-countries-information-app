const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const findCountryInformation = require('./utils/findCountry')

const app = express()

const port = process.env.PORT || 3000

// setting up body-parser

app.use(bodyParser.urlencoded({extended: true}))

// define path for express config

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// setup handlebars engine and view location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('home', {
        title: 'Information about countries',
        description: 'Search for a country & you will get appropriate informations about the country',
        myname: 'Pinaki Prasanna Das'
    })
})

app.post('', (req, res) => {
    const countryName = req.body.name

    findCountryInformation(countryName, (error, result) => {
        if (error) {
            return res.render('home', {
                title: 'Information about countries',
                description: 'Search for a country & you will get appropriate informations about the country',
                myname: 'Pinaki Prasanna Das',
                result: error
            })   
        }

        res.render('home', {
            title: 'Information about countries',
            description: 'Search for a country & you will get appropriate informations about the country',
            myname: 'Pinaki Prasanna Das',
            altname: 'Flag Image',
            flag: result.flag,
            name: 'Name: ' + result.name,
            capital: 'Capital: ' + result.capital,
            region: 'Region: ' + result.region,
            subregion: 'Subregion: ' + result.subregion,
            population: 'Population: ' + result.population,
            area: 'Area: ' + result.area,
            currencycode: 'Currency code: ' + result.currencycode,
            currencyname: 'Currency name: ' + result.currencyname,
            currencysymbol: 'Currency symbol: ' + result.currencysymbol,
            language: 'Language: ' + result.language
        })
    })
})

app.listen(port, () => {
    console.log('App is listening on port 3000.')
})