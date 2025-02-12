const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// User registration
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) return res.status(400).send('Invalid credentials');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
