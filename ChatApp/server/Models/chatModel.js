const  mongodb  = require("mongoose")
const Schema = mongodb.Schema;


const chatSchema = new Schema(
    {
        members: Array,  
    },
    {
        timestamps: true,
    },
)

const chatModel = mongodb.model("Chat", chatSchema); 

module.exports = chatModel;


