const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mySchema = new Schema({
    title: String,
    img: String
});

module.exports = mongoose.model('Universe', mySchema);