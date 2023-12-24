// routes/meeting.js

const express = require("express");

const Meeting = require("../models/Meeting");

//Get Request 

router.get('/meetings', async(req,res)=>{
    try {
        const meetings = await Meeting.findAll();
        res.json(meetings);
    } catch(error) {
    console.log(error);
    res.status(500).json({error : "Server error"});
    }
});

//Post Request for booking the slot

router.get('/book/:meetingId', async(req,res)=>{
    try {
        const meeting = await Meeting.findByPk(meetingId);
        
        if(!meeting) {
            return res.status(404).json({error : "Meeting not found"})
        }



    } catch(error) {
    console.log(error);
    res.status(500).json({error : "Server error"});
    }
});

