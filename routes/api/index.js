const express = require('express')
const _ = express.Router()
const authentication = require("./auth.js")
const category = require("./category.js")

_.use("/auth",authentication);
_.use("/category",category);

module.exports=_
