const express = require('express')
const _ = express.Router()
const RegistrationController =require("../../controllers/authcontrollers/RegistrationController.js")
const LoginContoroller =require("../../controllers/authcontrollers/LoginContoroller.js")
const EmailVerificationOtpMatch =require("../../controllers/authcontrollers/EmailVerificationOtpMatch.js")

_.post("/regsitrtion",RegistrationController)
_.post("/login",LoginContoroller)
_.post("/emailVerificationOtpMatch",EmailVerificationOtpMatch)

module.exports=_
