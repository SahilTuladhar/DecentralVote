const express = require("express");
//const User = require("../models/User");
const Election = require ("../models/Election")
const Cookies = require('js-cookie')
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt')


//register seller
const electioncreation= async (req, res) => {
    // Helper function to generate a random 7-letter alphanumeric word
    User = req.user
    console.log('user',User)
    try {
     
    
     
  
      const election = new Election({
        ...req.body,
        createdby: User.id,
      });

      // Save the user to the database
      await election.save();
  
      console.log('Election created');
     
      res.status(201).send({ election});
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };



const electionlist = async(req,res)=>{
    const User = req.user
    const Userid = User.id
    try {
        const elections= await Election.find({ createdby: Userid})
       // console.log('elections',elections)
        res.send({elections});
    } catch (error) {
        
    }
}





module.exports = {electioncreation,electionlist}