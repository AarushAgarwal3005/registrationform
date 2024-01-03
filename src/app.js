const express = require("express");
const path = require("path");
const port = process.env.PORT || 7000;
const app = express();
const hbs = require("hbs");
const bcrypt=require("bcryptjs");
require("../src/db/conn")
const Register = require("../src/models/registers")







const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.set("views", template_path);
hbs.registerPartials(partials_path)
app.use(express.static(static_path));
app.set("view engine", "hbs");



app.get("/index", (req, res) => {
    res.render("index");

})
app.get("/register", (req, res) => {
    res.render("register");

})

app.get("/login", (req, res) => {
    res.render("login");

})


app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                name: req.body.name,
                contactNo: req.body.contactNo,
                age: req.body.age,
                email: req.body.email,
                gender: req.body.gender,
                password: password,
                confirmPassword: cpassword

            })

            // P -A -S -S -W -O -R -D     H -A -S -H -I -N -G 






            const registered = registerEmployee.save();
            res.status(201).render("index2")


        } else {
            res.send("passwords not same")
        }


    } catch (error) {
        res.status(400).send(error);

    }

})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userEmail = await Register.findOne({email: email})

         const isMatch= await bcrypt.compare(password,userEmail.password)
        if (isMatch) {
            res.status(201).render("index2")
        } else {
            res.send(" invalid password  ")
        }

    } catch (error) {
        res.status(400).send("the entered email is invalid")

    }
})


app.get("/", (req, res) => {
    res.render("index");
});
app.listen(port, () => {
    console.log(`connection success At port ${port}`);
});