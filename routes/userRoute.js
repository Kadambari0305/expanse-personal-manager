const express = require('express')
const { loginController, registerController } = require('../controllers/usercontroller')

//router object
const router = express.Router()

//routers
//post || login
router.post('/login', loginController)

//Post || register

router.post('/register', registerController)

module.exports = router