const User = require('../models/user.js')
const bcryptHelper = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

module.exports = {
    register: (req, res) => {
        User.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        .then(data => {
            res.status(200).json({
                msg: 'success register user',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then(data => {
            if(!data) {
                res.status(400).json({
                    msg: 'email was wrong'
                })
            } else {
                let check = bcryptHelper.compare(data.password, req.body.password)
                if(check !== true) {
                    res.status(400).json({
                        msg: 'password was wrong'
                    })
                } else {
                    res.status(200).json({
                        msg: 'success login',
                        token: jwt.generate(data)
                    })
                }
            }
        })
        .catch(err => {
            res.status(200).json({
                err: err
            })
        })
    }
}