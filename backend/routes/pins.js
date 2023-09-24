
const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin.js');
router.post('/', async (req, res) => {
  try {
    const newPin = new Pin(req.body);
    const savedPin = await newPin.save();
    res.status(201).json(savedPin); 
  } catch (error) {
    console.error('Error while saving Pin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/', async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (error) {
      console.error('Error while fetching pins:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
