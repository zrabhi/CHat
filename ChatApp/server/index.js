process.env.ATLAS_URI = "mongodb+srv://zakariarabhi598:PASSpass123@cluster0.rjuphdr.mongodb.net/chatapp?";
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute'); 
require("dotenv").config;
const mongodb = require('mongoose');
app.use(express.json()); 
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
 


mongodb.set('strictQuery', true);

mongodb.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("Mongodb established");})
.catch(err => {console.log("Mongo db connection FAILED : " + err.message)});

//CRUD OPERATION 
app.get("/", (req, res) => {
        res.send("Welcome to cHAT aPP apis")
 
})
   
app.post("/user" ,(req, res) => {

});


app.put("/", (req, res) => {

});
app.delete("/", (req, res) => {

});














const port = process.env.PORT || 5000;

app.listen(port, (req, res) =>
{
    console.log(`Server is running on port ${port}`);
});




