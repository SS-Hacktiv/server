const jwt = require('jsonwebtoken')

module.exports = {
    generate: (data) => {
        let token = jwt.sign({
            email: data.email,
            name: data.name
        }, process.env.SECRET)
        return token
    }
}