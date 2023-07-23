const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const createToke = (_id) => {
    process.env.JWT_SECRET_KEY = "SUPERSECRETEKEY777"
    console.log("secrete key ", process.env.JWT_SECRET_KEY);
    const jwtkey = process.env.JWT_SECRET_KEY || "SUPERSECRETEKEY777";

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        if (!name || !email || !password)
            return (res.status(400).json("All fields are required..."));
        if (!validator.isEmail(email))
            return (res.status(400).json("Email format not valid..."));
        if (!validator.isStrongPassword(password))
            return (res.status(400).json("Password format not valid..."));
        let user = await userModel.findOne({ email });
        if (user)
            return (res.status(400).json("User with the given email already exists..."));
        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = createToke(user._id);
        res.status(200).json({ _id: user._id, name, email, token });

    } catch (err) {
        console.log("Error Occured: " + err.message);
        res.status(500).json(err);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user)
            return (res.status(400).json("Invalid email!!!"));
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return (res.status(400).json("Invalid password"));
        const token = createToke(user._id);
        res.status(200).json({ _id: user._id, name: user.name, email, token });
    }
    catch (err) {
        console.log("Error Occured: " + err.message);
        res.status(500).json(err);
    }
}


const findUser = async (req, res) => {

    const userId = req.params.userId;
    try {
        let user = await userModel.findById(userId);
        if (!user)
            return (res.status(404).json("User NOT Found"));
        res.status(200).json(user);
    }
    catch (err) {
        console.log("Error Occured: " + err.message);
        res.status(500).json(err);
    }
}


const getUsers = async (req, res) => {

    try {
        let users = await userModel.find();
        if (!users)
            return res.status(404).json("Not user foudn in db");
        res.status(200).json(users);
    } catch (err) {
        console.log("Error Occured: " + err.message);
        res.status(500).json(err);
    }
}
module.exports = { registerUser, loginUser, findUser, getUsers };