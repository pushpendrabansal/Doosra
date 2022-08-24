const mongoose = require('mongoose');

const Trip = mongoose.Schema({

	status:{type:String},
	rider:{type:String},
	driver:{type:String},
	startLocation:[{
		lat:{type:String},
		long:{type:String}
	}],
	endLocation:[{
		lat:{type:String},
		long:{type:String}
	}],
	price:{type:Number,default:0},
	coupon:{type:String}

	/* 
		status
		1 - looking for driver
		2 - cancelled by rider
		3 - cancelled by driver
		4 - completed
		5 - driver to accept
	*/
},{
	timestamp:true
});

exports.module = mongoose.model("Trip", Trip);