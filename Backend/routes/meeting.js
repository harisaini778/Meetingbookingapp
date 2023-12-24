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

    const {meetingId} = req.params;

    try {
        const meeting = await Meeting.findByPk(meetingId);
        
        if(!meeting) {
            return res.status(404).json({error : "Meeting not found"})
        }

        if(meeting.bookedSlots < meeting.slots) {
            meeting.bookedSlots +=1;
            await meeting.save();
            return res.status(200).json({message : "Slot booked successfully"});
        }
        else {
            return res.status(400).json({error : "No slots are available"});
        }


    } catch(error) {
    console.log(error);
    res.status(500).json({error : "Server error"});
    }
});

// Cancel a booking 

router.post('/cancel/:meetingId',async(req,res)=>{
    const {meetingId} = req.params;
    try {
        const meeting = await Meeting.findByPk(meetingId);

       if(!meeting) {
        return res.status(404).json({error:"Meeting not found"});
       }

       if(meeting.bookedSlots > 0 ) {
        meeting.bookedSlots = -1;
        await meeting.save();
        return res.status(200).json({message:"Booking cancelled successfully!"})

       } else {

       return res.status(404).json({error:"No booked slots to cancel"});

       }

    } catch(error){
        return res.status(500).json({message:"Server error"});
    }
});

module.exports = router;

