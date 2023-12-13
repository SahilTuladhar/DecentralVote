const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const electionSchema = new mongoose.Schema({
    title:{
        type:String,
        required :true, 
    },
  
    startdate:{
        type: Date, 
        required: true,
    },
    enddate: {
      type:Date,
      required: true
    },
    organizer :{
        type: String,
        required : true
    },
    createdby :{
        type: String,
        required : true
    }

 
});



const Election= mongoose.model ('Election', electionSchema);

module.exports = Election
;
