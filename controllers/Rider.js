const Rider = require('./../models/rider.js')
const Driver = require('./../models/driver.js')
const Trip = require('./../models/trip')

const { check, validationResult } = require('express-validator');
const findNearestDriver = async (userLocation) =>{
	
	return Drivers;
}

module.exports = {
	async riderRegister(req,res){
		try{
			let payload = req.body;
			const rider = await Rider.insertMany([{
				name:payload.name,
				email:payload.email,
				phone:payload.phone
			}]);
			res.send(rider);
		}catch(e){ 
			console.log(e)
			res.send(e)
		}
	},
	async bookRide(req,res){
		try{
			let payload = req.body;
			// create trip
			await Trip.insertOne({
				status:1,
				rider: payload.userId,
				driver: payload.driverId,
				startLocation:[{
					lat: payload.location.lat,
					long: payload.location.long
				}],
			})
		}catch(e){
			console.log(error)
			res.send(error)
		}
	}
}