// const axios = require('axios')
const request = require('request')

module.exports = {
    getImage: (req, res) => {
        var options = {
            json: true,
            qs: {
                api_key: process.env.nasatoken
            },
            url: 'https://api.nasa.gov/EPIC/api/natural/images'
        }
        request(options, ((error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).json(body)
            } else {
                res.status(400).json(error)
            }
        }))
    },
    apod: (req, res) => {
        var options = {
            json: true,
            qs: {
                api_key: process.env.nasatoken,
                hd: true
            },
            url: 'https://api.nasa.gov/planetary/apod'
        }
        request(options, ((error, response, body) => {
            console.log(error)
            console.log(response)
            if (!error && response.statusCode == 200) {
                res.status(200).json(body)
            } else {
                console.log(error)
                res.status(400).json(error)
            }
        }))
    },
    mars: (req, res) => {
        var options = {
            json: true,
            qs: {
                sol: 1000,
                api_key: process.env.nasatoken

            },
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'
        }
        request(options, ((error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).json(body)
            } else {
                res.status(400).json(error)
            }
        }))
    },
    search: (req, res) => {
        var options = {
            json: true,
            qs: {
                q: req.query.keyword
            },
            url: 'https://images-api.nasa.gov/search'
        }
        request(options, ((error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).json(body)
            } else {
                console.log(error)
                res.status(400).json(error)
            }
        }))

    }
}