require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const { PORT = 3001 } = process.env;
const { s3 } = require("./s3");
const { uploader } = require("./multer");
const {
    addUser,
    getUserByEmail,
    findUserById,
    addProfilePic,
} = require("./db");
const fs = require("fs");
//-------------------------------------------- Middleware
/*
app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("---------------------");
    next();
});*/

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

app.use(express.urlencoded({ extended: false }));
// json parser
app.use(express.json());

//--------------------------------------------- Registration

app.post("/register", (req, res) => {
    //getting values from the form
    const { firstName, lastName, email, password } = req.body;

    //if firstname is empty then give back an error
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

    //now we got all the data, we need to add a new user
    //first we need to hash the password, we cannot the password with clean letters
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

//------------------------------------------------ Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req.bodyEmail server", req.body);

    getUserByEmail(email).then((result) => {
        if (!result) {
            res.json({ success: false, error: "Email doesn't exist" });

            return false;
        }
        console.log("userData from getByEmail server", result);
        const comparePass = bcrypt.compareSync(password, result.password);
        console.log("compareee", comparePass);
        if (!comparePass) {
            return res.json({
                success: false,
                error: "Wrong password",
            });
        }

        req.session.userId = result.id;

        console.log("session after login", req.session);
        return res.json({
            success: true,
            data: result.id,
        });
    });
});

//---------------------------------------------Logout
app.get("/logout", (req, res) => {
    req.session = null;
    console.log("logout session", req.session);
    return res.json({
        userId: null,
    });
});
///////
//////// Get the user information //////

app.get("/user", (req, res) => {
    //res.json("test");

    findUserById(req.session.userId).then((userData) => {
        console.log("user data", userData);
        res.json(userData);
    });
});

//check if user is logged in from the session
app.get("/user/id.json", (req, res) => {
    //console.log(req.session.userId);
    res.json({
        userId: req.session.userId,
    });
});

//////// upload the Picture ///////

app.post("/profilepic", uploader.single("file"), (req, res) => {
    console.log(req.file);
    const { filename, mimetype, size, path } = req.file;

    const promise = s3 // this to send to aws, different for other cloud storage
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            let pictureData = {
                id: req.session.userId,
                url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
            };
            addProfilePic(pictureData.url, pictureData.id).then((userData) => {
                console.log("userData", userData);
                res.json(userData);
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

//catching the home page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
