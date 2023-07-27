const {
    createChat,
    getMessages,
} = require('../Controller/messageController');

const express = require('express');

const router = express.Router(); 


router.post("/", createChat);
router.get("/:chatId", getMessages);


module.exports = router;