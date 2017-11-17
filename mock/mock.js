const json = require('./mock.json')
exports.index = function(req,res) {
    res.send(json)
}