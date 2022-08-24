const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const Validation = require('./validation')

// controllers
const RiderController = require('./controllers/Rider.js')
const DriverController = require('./controllers/Driver.js')

const app = express();

// connect db
const conn = mongoose.connect(`mongodb+srv://test:${encodeURIComponent('Doosra@2506')}@cluster0.xbcrzur.mongodb.net/?retryWrites=true&w=majority`);
mongoose.connection.once('open', function() {
    console.log('connected to db')
})

// encode data format
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//routes
app.post('/rider',Validation.registerRider(),Validation.validate,RiderController.riderRegister);

app.post('/driver',Validation.registerDriver(),Validation.validate,DriverController.driverRegister);

app.post('/book-ride',Validation.bookRide(),Validation.validate,RiderController.bookRide);
app.post('/start-ride',Validation.startRide(),Validation.validate,DriverController.startRide);
app.post('/end-ride',Validation.endTrip(),Validation.validate,DriverController.endTrip);

app.post('/driver-request',Validation.driverRequest(),Validation.validate,RiderController.driverRequest);

app.post('/driver-switch',Validation.driverSwitch(),Validation.validate,DriverController.availSwitch);


app.listen(3000, () => {
    console.log("Listening on 3000 ");
});