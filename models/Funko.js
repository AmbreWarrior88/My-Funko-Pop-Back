const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mySchema = new Schema({
    universe: { type: ObjectId, ref: 'Universe' },
    name: String,
    edition: String,
    type: String,
    number: String,
    buy: String,
    price: Number,
    newPrice: Number,
    img: String
});

module.exports = mongoose.model('Funko', mySchema);

