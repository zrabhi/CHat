const  mongodb  = require("mongoose")
const Schema = mongodb.Schema;

const userShema = new Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 },
        email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
        password: { type: String, required: true, minlength: 3, maxlength: 1024 }
    }, 
    {
        timestamps: true,
    }
);

const UserModel = mongodb.model("User", userShema);
module.exports = UserModel;