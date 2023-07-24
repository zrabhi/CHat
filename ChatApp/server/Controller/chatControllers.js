const chatModel = require('../Models/chatModel');


const createChat = async (req, res) => {
    const {firstID, SecondId} = req.params.body;


    try{
        const chat = await chatModel.findOne({
            members: { $all: [firstID, SecondId]},
        })
        if (chat)
            return res.status(200).json(chat);
        const newChat = new chatModel({
                members:[firstID, SecondId],
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
    const {firstId,secondID} = req.params;

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
