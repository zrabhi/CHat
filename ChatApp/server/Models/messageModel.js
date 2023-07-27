const  mongodb  = require("mongoose")


const Schema =  mongodb.Schema;

const messageSchema = new Schema({
    chatId: String,
    sendId: String,
    text:   String,

},
{
    timestamps: true,
})


const messageModel = mongodb.model("Message", messageSchema);

module.exports = messageModel;