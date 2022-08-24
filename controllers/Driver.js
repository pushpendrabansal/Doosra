const Driver = require('./../models/driver.js')
const Config =require('./../config')
const Trip = require('./../models/trip')


const isDriverNearBy = async (location) =>{
	const trip = await Trip.aggregate([
		{
		  $geoNear: {
			 near: { type: "Point", coordinates: [ location.lat , location.long ] },
			 distanceField: "dist.calculated",
			 maxDistance: Config.maxDistanceAllow,
			 includeLocs: "dist.location",
			 spherical: true
		  }
		}
	])
	return trip
}

module.exports = {
	async driverRegister(req,res){
		try{
			const rider = await Driver.insertOne(req.body);
			res.send(rider);
		}catch(e){
			console.log(error)
			res.send(error)
		}
	},
	async request(req,res){
		try{
			let driver = req.body.driverId
			let driverData = await Driver.findOne({_id:driver})
			let availTrips = await isDriverNearBy(driverData.location)
			res.status(200)
			res.send(availTrips)
		}catch(e){
			console.log(error)
			res.send(error)
		}
	},
	async availSwitch(req,res){
		try{
			let driver = req.body.driverId
			let location = req.body.location
			let temp = await Driver.findOneAndUpdate({_id:driver},[{$set:{avail:{$eq:[false,"$avail"]}},location}])
			res.status(200)
			res.send(availTrips)
		}catch(e){
			console.log(error)
			res.send(error)
		}
	},
	async endTrip(req,res){
		try{
			let payload = req.body;
			// create trip
			await Trip.findOneAndUpdate({
				_id:payload.tripId
			},
			{
				status:4,
				endLocation:[{
					lat: payload.location.lat,
					long: payload.location.long
				}],
				price: Math.random(100,1000)
			})
		}catch(e){
			console.log(error)
			res.send(error)
		}
	},
	async startRide(req,res){
		try{
			let payload = req.body;
			// create trip
			await Trip.findOneAndUpdate({
				_id:payload.tripId
			},
			{
				status:2,
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