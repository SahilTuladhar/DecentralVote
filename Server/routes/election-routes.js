const express = require('express')
const app = express()
const auth = require('../controllers/auth-controller')
const controls = require( '../controllers/election-controller')
const Electionrouter = express.Router()

Electionrouter.post('/createelection',auth, controls.electioncreation)



module.exports = Electionrouter; 