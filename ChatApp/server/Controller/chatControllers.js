const chatModel = require('../Models/chatModel');


const createChat = async (req, res) => {
    const {firstId, secondId} = req.body;

    try{
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId]},
        })
        if (chat)
        return res.status(200).json(chat);
        const newChat = new chatModel({
            members:[firstId, secondId],
        })
        const response = chatModel.save(newChat);
        res.status(200).json(response);
    }catch(err)
    {
        console.error(err);
        res.status(500).json(err);
    }
}

const findUserChats = async (req,res) =>
{
    const {userId} = req.params;
    console.log("get chat request performed", req.params);


    try{
        const chats = await chatModel.find({
            members: { $in: [userId]},
        
        })
        res.status(200).json(chats);        
        
    }catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}


const findUserChat = async (req,res) =>
{
    const {userId} = req.params;

    try{
        const chat = await chatModel.findOne({
            members: { $all: [userId]},
        
        })
    res.status(200).json(chat);         
    }catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {createChat, findUserChats, findUserChat}
