const express = require('express')
const mongoose = require('mongoose')
const app =  express()
const cors = require('cors')
const Layer = require('./Layer')
app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://boxshadow-ac98f.web.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
mongoose.connect('mongodb+srv://phantomtet:chuanoiduoc@cluster0.fxldu.mongodb.net/test', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected, console log in server')
})
app.post('/save', (req, res) => {
    
    let layer = new Layer({
        layerData: req.body.layerData
    })
    layer.save()
    .then(data => {
        res.send(data.id)
        console.log('saving layer with id' + data.id)
    })
    .catch(err => console.log(err))
})
app.get('/:layerID', (req, res) => {
    console.log(req.params.layerID)
})
app.get('/', (req, res) => {
    console.log('connected')
})
app.listen(3001)