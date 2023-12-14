const express = require("express");

const User = require("../models/User");
const Election = require("../models/Election");

const addVoter = async (req, res, next) => {
    try {
        const { electionId } = req.params;
        const { name, voterID } = req.body;

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        const user = await User.findOne({ voterID });

        if (!user || (user.name !== name || user.voterID !== voterID)) {
            return res.status(400).json({ message: 'Invalid name or voterID for the user' });
        }

        // Check if the voterId is already present in the voters array
        if (election.voters.includes(voterID)) {
            return res.status(400).json({ message: 'Voter already exists for this election' });
        }

        // Add the voterId to the voters array
        election.voters.push(voterID);

        // Save the updated election with the new voterId in the voters array
        await election.save();

   

        res.status(201);
    } catch (error) {
        next(error);
    }
};

module.exports = { addVoter };
