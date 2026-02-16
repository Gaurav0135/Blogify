const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/authentication");

const Blog = require("./models/blog");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");


const app = express();
const PORT = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>{console.log("MongoDb connected successfully ")});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));


app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.get("/", async (req, res) => {
    const allblogs = await Blog.find({}).sort({ createdAt: -1 });

    res.render("home", {
        user: res.locals.user || null,
        blogs: allblogs
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})