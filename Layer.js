const mongoose = require('mongoose')

const LayerSchema = mongoose.Schema({
    layerData: Array
})
module.exports = mongoose.model('Layer', LayerSchema)