// import modules/packages
const mongoose = require("mongoose");

// bird schema
const birdSchema = new mongoose.Schema({
    name: String,
    family: String,
    lifeSpan: Number
});

// schema model instance
const Bird = mongoose.model("bird", birdSchema);

// export model instance
module.exports = Birds;