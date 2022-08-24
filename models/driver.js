const mongoose = require('mongoose');

const Rider = mongoose.Schema({
	name:{type:String},
	email:{type:String},
	phone:{type:String},
	location:{
		lat:{type:String},
		long:{type:String}
	},
	avail:{type:Boolean,default:false}
});

module.exports = mongoose.model("Driver", Rider);