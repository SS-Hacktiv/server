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


    static imageDetails(req,res){
        axios({
            method: 'get',
            url: `http://hubblesite.org/api/v3/image/${req.params.id}`
        })
            .then(response=>{
                let imageWeb = response.data.image_files[response.data.image_files.length-1].file_url
                res.status(200).json(imageWeb)
            })
            .catch(err=>{
                res.status(400).json(err)
            })
    }

    static launches(req,res){
        // console.log('masuk launches')
        axios({
            method:'GET',
            url:`https://api.spacexdata.com/v3/launches/upcoming`
        })
            .then(response=>{
                // console.log(response, ' masuk sini')
                res.status(200).json(response.data)
            })
            .catch(err=>{
                // console.log(err, 'masuk sini')
                res.status(400).json({err})
            })
    }
}

module.exports = Controller