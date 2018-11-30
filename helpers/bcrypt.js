const bcrypt = require('bcryptjs')

module.exports = {
    hash: (password) => {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    compare: (password, input) => {
        return bcrypt.compareSync(input, password)
    }
}