const express = require('express');
const { Module } = require('module');
const { 
        registerUser, 
        loginUser, 
        findUser, 
        getUsers 
    } = require('../Controller/userController');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;