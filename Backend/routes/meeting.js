// routes/meeting.js

const express = require("express");
const Meeting = require("../models/Meeting");
const router = express.Router();

// Get Request
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.findAll();
    res.json(meetings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Post Request for booking the slot
router.post('/book/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  try {
    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    if (meeting.bookedSlots < meeting.slots) {
      meeting.bookedSlots += 1;
      await meeting.save();
      return res.status(200).json({ message: "Slot booked successfully" });
    } else {
      return res.status(400).json({ error: "No slots are available" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Cancel a booking
router.post('/cancel/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  try {
    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    if (meeting.bookedSlots > 0) {
      meeting.bookedSlots -= 1; // Fix: Use -= to decrease the bookedSlots
      await meeting.save();
      return res.status(200).json({ message: "Booking cancelled successfully!" });
    } else {
      return res.status(404).json({ error: "No booked slots to cancel" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Add Dummy Meetings Slots
router.post('/api/add-dummy-meetings', async (req, res) => {
  try {
    // Clear existing meetings (for testing purposes)
    await Meeting.destroy({ where: {} });

    // Add dummy meetings
    const dummyMeetings = [
      { date: new Date('2023-01-01T09:00:00'), slots: 5, bookedSlots: 2 },
      { date: new Date('2023-01-02T10:30:00'), slots: 10, bookedSlots: 5 },
      { date: new Date('2023-01-03T14:00:00'), slots: 8, bookedSlots: 3 },
    ];

    await Meeting.bulkCreate(dummyMeetings);

    res.status(200).json({ message: 'Dummy meetings added successfully' });
  } catch (error) {
    console.error('Error adding dummy meetings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
