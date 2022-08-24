const mongoose = require('mongoose');

const Rider = mongoose.Schema({
	name:{type:String},
	email:{type:String},
	phone:{type:String}
});

module.exports = mongoose.model("Rider", Rider);