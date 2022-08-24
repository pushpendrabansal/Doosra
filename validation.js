const { check, body, validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    validate(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
			return res.json(errors)
		}
        next()
    },
    registerRider(){
        return[
            check('email','Please Enter your Email').isEmail(),
            check('name','Please enter your name').notEmpty(),
            check('phone','Please enter your phone number').isLength({min:10,max:10})
        ]
    },
    registerDriver(){
        return[
            check('email','Please Enter your Email').isEmail(),
            check('name','Please enter your name').notEmpty(),
            check('phone','Please enter your phone number').isLength({min:10,max:10}),
            check('location',"Please enter your location").isObject()
        ]
    },
    bookRide(){
        return[
            body('userId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter UserID")
        ]
    },
    driverRequest(){
        return[
            body('driverId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter Driver Id"),
            body('location').custom(v=>(v.lat && v.long)).withMessage("Please Enter location")
        ]
    },
    driverSwitch(){
        return[
            body('driverId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter Driver Id"),
            body('location').custom(v=>(v.lat && v.long)).withMessage("Please Enter location")
        ]
    },
    endTrip(){
        return[
            body('tripId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter Driver Id"),
            body('location').custom(v=>(v.lat && v.long)).withMessage("Please Enter location")
        ]
    },
    startRide(){
        return[
            body('tripId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter Trip Id"),
            body('driverId').custom(v=>ObjectId.isValid(v)).withMessage("Please Enter Driver Id"),
            body('location').custom(v=>(v.lat && v.long)).withMessage("Please Enter location")
        ]
    }
}