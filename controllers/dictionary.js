const axios = require('axios')

class Controller {
    static getWord(req, res) {
        axios({
            method: "GET",
            url: `http://api.pearson.com/v2/dictionaries/entries?headword=${req.params.word}`
        })
        .then(result => {
            let array = []
            result.data.results.forEach(element => {
                let isUnique = true
                if(element.senses[0].definition) {
                    array.forEach(datum => {
                        if(String(datum.senses[0].definition).toLowerCase() === String(element.senses[0].definition).toLowerCase()) {
                            isUnique = false
                        }
                    });
                    if(isUnique) {
                        array.push(element)
                    }
                }
            });
            res.status(200).json(array)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message, note: "Please see console for details"})
        })
    }
    static getWordAudio(req, res) {
        axios({
            method: "GET",
            url: `http://api.pearson.com/v2/dictionaries/entries?headword=${req.params.word}&audio=pronunciation`
        })
        .then(audio => {
            console.log('result', audio.data.results)
            if(audio.data.results.length > 0) {
                audio.data.results.forEach(element => {
                    if(element.pronunciations) {
                        let audioLink = element.pronunciations[0].audio
                        console.log('audio', audioLink)
                        res.status(200).json({audioLink: audioLink[0].url})
                        return
                    }
                });
            } else {
                res.status(200).json({audioLink: []})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message, note: "Please see console for details"})
        })
    }
}

module.exports = Controller