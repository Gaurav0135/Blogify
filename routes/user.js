const {Router} = require('express');
const user = require("../models/user");


const router = Router();

router.get("/signin", (req,res)=>{
    res.render("Signin");
});

router.get("/signup",(req, res)=>{
    res.render("signup");
});

router.post("/signin", async (req, res) =>{
    const {email, password} = req.body;
    const User = await user.matchPassword(email, password);

    console.log("USER:", User);
    res.redirect("/");
})


router.post("/signup", async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FULLNAME VALUE:", req.body.fullName);

    try {
        const { fullName, email, password } = req.body;

        await user.create({
            fullName,
            email,
            password
        });

        res.redirect("/");
    } catch (err) {
        console.log("ERROR:", err);
        res.send("Error occurred");
    }
});


module.exports = router;