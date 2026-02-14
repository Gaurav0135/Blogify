const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");


const app = express();
const PORT = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>{console.log("MongoDb connected successfully ")});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: false}));
app.use('/user', userRouter);




app.get("/", (req, res)=>{
    res.render("home");
});



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})