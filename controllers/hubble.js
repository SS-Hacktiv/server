const axios = require('axios')

class Controller{
    static imagesList(req,res){
        axios({
            method: 'get',
            url: 'http://hubblesite.org/api/v3/images'
        })
            .then(response=>{
                res.status(200).json(response.data)
            })
            .catch(err=>{
                res.status(400).json({err})
            })
    }
}

module.exports = Controller