const express = require('express')
const {createCategoryController,categoryStatusController} = require('../../controllers/categorycontrollers/createCategoryController')
const _ = express.Router()

_.post("/cratecategory",createCategoryController)
_.post("/status",categoryStatusController)

module.exports=_
