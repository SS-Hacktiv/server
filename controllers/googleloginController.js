const User = require('../models/user')
const jwtHelper = require('../helpers/jwt')

module.exports = {
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        }, (err, data) => {
            if(err) {
                res.status(400).json({
                    err: err
                })
            } else {
                if(data) {
                    res.status(200).json({
                        token: jwtHelper.generate(req.body),
                        email: data.email,
                        name: data.name
                    })
                } else {
                    User.create({
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password || 'google'
                    }, (err, data) => {
                        if(err) {
                            res.status(400).json({
                                err: err
                            })
                        } else {
                            res.status(400).json({
                                token: jwtHelper.generate(req.body),
                                name: req.body.name,
                                email: req.body.email
                            })
                        }
                    })
                }
            }
        })
    }
}