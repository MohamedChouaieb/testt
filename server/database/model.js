const mongoose = require("mongoose");
const db = require("./index.js");

const Schema = new mongoose.Schema({
    id : Number,
    type_flight:String,
    capacite:Number,
    go_date:Date,
    return_date:Date,
    destination:String,
    price:Number,
    image:Array,

});

const res = new mongoose.Schema({
    id:Number,
    id_type:Number,
    type:String,
    go_date:Date,
    return_date:Date,
    destination:String,
    price:Number,
    capacite:Number,

})

module.exports = {Flight :mongoose.model('Schema', Schema),
                  Resevation :mongoose.model('reservation',res)
                };