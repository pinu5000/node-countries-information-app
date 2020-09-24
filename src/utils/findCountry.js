const request = require('postman-request')

const findCountryInformation = (name, callback) => {
    const url = 'https://restcountries.eu/rest/v2/name/' + name + '?fullText=true'

    request({ url, json: true }, (error, result) => {
        if (error) {
            callback('Unable to connect', undefined)
        }else if (result.body.status === 404) {
            callback('Try another search', undefined)
        } else {
            callback(undefined, {
                name: result.body[0].name,
                capital: result.body[0].capital,
                region: result.body[0].region,
                subregion: result.body[0].subregion,
                population: result.body[0].population,
                area: result.body[0].area,
                currencycode: result.body[0].currencies[0].code,
                currencyname: result.body[0].currencies[0].name,
                currencysymbol: result.body[0].currencies[0].symbol,
                language: result.body[0].languages[0].nativeName,
                flag: result.body[0].flag
            })
        }
    })
}

module.exports = findCountryInformation