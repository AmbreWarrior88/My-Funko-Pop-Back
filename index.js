const express = require("express")
const formidable = require("express-formidable")
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/funko_pop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const universes = require('./data/universes.json')
const funkos = require('./data/data.json')

const Universe = require("./models/Universe");
const Funko = require("./models/Funko");

app.get("/refresh", async (req, res) => {
    // ****** Update universe list ******
    // await Universe.insertMany(universes)
    // res.json(universes)

    // ****** Update funko list *********
    const list = [];
    for (let i = 0; i < funkos.length; i++) {
        const funko = funkos[i];
        const universe = funko.universe;
        let obj = await Universe.findOne({ title: universe });
        if (!obj) {
            obj = await Universe.findOne({ title: "Other" });
        }
        funko.universe = obj._id;
        list.push(funko);
    }
    await Funko.insertMany(list);
    res.json(list)
})

app.get("/funkos/:universe", async (req, res) => {
    const funkosList = await Funko.find({ universe: req.params.universe });
    res.json(funkosList);
})

app.get("/universes", async (req, res) => {
    const universesList = await Universe.find();
    res.json(universesList);
})

app.listen(4000, () => {
    console.log("server started");
})