const express = require('express')
const app = express()
const auth = require('../controllers/auth-controller')
const controls = require( '../controllers/candidate-controller')
const Candidaterouter = express.Router()

Candidaterouter.post('/addcandidate/:electionId',controls.addCandidate)

module.exports = Candidaterouter; 