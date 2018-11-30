const User = require('../models/user')
const jwt = require('../helpers/jwt')
const axios = require('axios')
const request = require('request')

module.exports = {
    login: (req, res) => {
        const option = {
            url: "https://graph.facebook.com/v3.2/me",
            json: true,
            qs: {
                fields: 'name,email',
                access_token: req.body.token
            }
        }
        request(option, (err, response, body) => {
            if(err) {
                res.status(400).json({
                    err: err.message
                })
            } else {
                User.findOne({
                    email: body.email
                }, (err, result) => {
                    if(err) {
                        res.status(400).json({
                            err: err
                        })
                    } else {
                        if(result) {
                            token = jwt.generate(result)
                            body.token = token
                            res.status(200).json(body)
                        } else {
                            User.create({
                                email: body.email,
                                name: body.name,
                                password: 'facebook',
                            }, (err, result) => {
                                if(err) {
                                    res.status(400).json({
                                        err: err
                                    })
                                } else {
                                    token = jwt.generate(body)
                                    body.token = token
                                    res.status(200).json(body)
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}


