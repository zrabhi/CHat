const express = require('express');
const {
    createChat, 
    findUserChats, 
    findUserChat,
} = require('../Controller/chatControllers');


const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findUserChat);

module.exports = router;