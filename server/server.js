require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const { PORT = 3001 } = process.env;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { addUser, getUserDetails } = require("./db");

//-------------------------------------------- Middleware
app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("---------------------");
    next();
});

//------------------------------------------------ Cookie Session
const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: `Awesome`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//--------------------------------------------- Registration
app.get("/", (req, res) => {
    res.redirect("/login");
});
app.post("/register", (req, res) => {
    //getting values from the form
    const { firstName, lastName, email, password } = req.body;

    if (firstName === undefined) {
        res.json({ success: false, error: "please fill the firstname" });
        return false;
    }
    if (lastName === undefined) {
        res.json({ success: false, error: "please fill the lastName" });
        return false;
    }
    if (email === undefined) {
        res.json({ success: false, error: "please fill the email" });
        return false;
    }
    if (password === undefined) {
        res.json({ success: false, error: "please fill the password" });
        return false;
    }

    const salt = bcrypt.genSaltSync();
    const hashedRegisterInput = bcrypt.hashSync(password, salt);

    addUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: hashedRegisterInput,
    })
        .then((userData) => {
            req.session.userId = userData.rows[0].id;

            console.log(userData.rows[0].id);

            if (req.session.userId) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            res.json({ success: false, error: err.detail });
        });
});

//check if user is logged in from the session
app.get("/user/id.json", (req, res) => {
    console.log(req.session.userId);
    res.json({
        userId: req.session.userId,
    });
});

//------------------------------------------------ Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    getUserDetails(email).then((objWithPass) => {
        if (
            objWithPass.rows[0] ||
            bcrypt.compareSync(password, objWithPass.rows[0].password)
        ) {
            req.session.userId = objWithPass.rows[0];
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
