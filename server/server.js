require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const { PORT = 3001 } = process.env;
const { s3 } = require("./s3");
const { uploader } = require("./multer");
const fs = require("fs");
const {
    addUser,
    getUserByEmail,
    findUserById,
    addProfilePic,
    addScore,
    getThreeNewestUsers,
    getOthersBySearchQuery,
    getOtherProfileByIDParam,
    getFriendship,
    sendRequest,
    acceptsFriendship,
    unfriendsFriendship,
} = require("./db");

//////// soket.io config ///
/*const server = require("socket.io")(SERVER, {
    allowrequest: (req, callback) => callback(null, req.headers.referer, req.headers.
});*/
///////////////////-------------------------------------------- Middleware

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

app.use(express.urlencoded({ extended: false }));
// json parser
app.use(express.json());

//check if user is logged in from the session
app.get("/user/id.json", (req, res) => {
    //console.log(req.session.userId);
    res.json({
        userId: req.session.userId,
    });
});

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
            console.log("err", err);
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
//////////////    SCORE   //////////////////////////////////
app.post("/ScoreEditor", (req, res) => {
    console.log("scoreEditor req.body", req.body, req.session);
    const { score } = req.body;
    const userId = req.session.userId;
    addScore(score, userId)
        .then((user) => {
            return res.json({ success: true, message: user.score });
        })
        .catch((err) => {
            console.log(err);
        });
});

//FIND PEOPLE ------------------------------------------------------>

app.get("/userlist", (req, res) => {
    getThreeNewestUsers().then((usersData) => {
        res.json(usersData);
    });
});

app.get("/userlist/:query", (req, res) => {
    console.log("USERLIST QUERY: ", req.params.query);
    getOthersBySearchQuery(req.params.query).then((user) => {
        console.log("user", user);
        res.json(user);
    });
});

app.get("/users/:id", (req, res) => {
    console.log("OTHER ID: ", req.params.id);
    console.log("SESSION ID!!!: ", req.session.userId);
    if (req.session.userId === req.params.id) {
        res.redirect("/");
    }
    getOtherProfileByIDParam(req.params.id).then((users) => {
        // console.log("DATA WATCHING: ", users);
        res.json(users);
    });
});

//FRIEND BUTTON ------------------------------------------------>

app.get("/buttontext/:otheruser", (req, res) => {
    let friendrequestStatus = {
        friendStatus: "",
    };
    console.log("friendrequestStatus:", friendrequestStatus);
    const { userId } = req.session;
    const { otheruser } = req.params;
    console.log(
        // "userData at getFriendRequestByIDparam before",

        "req.params.otheruser",
        req.params.otheruser,
        "req.session.userId",
        req.session.userId
    );
    getFriendship(userId, otheruser)
        .then((status) => {
            console.log("status", status);
            if (status.length === 0) {
                console.log("friendsend");
                friendrequestStatus.buttonText = "Add Friend";
                res.json({ buttonText: friendrequestStatus.buttonText });
            } else {
                if (status[0].accepted) {
                    friendrequestStatus.buttonText = "Unfriend";
                } else {
                    if (status[0].sender_id === req.session.userId) {
                        friendrequestStatus.buttonText = "Cancel";
                    } else {
                        friendrequestStatus.buttonText = "Accept";
                    }
                }
                console.log(
                    "getFriendShip results in DATABASE: ",
                    friendrequestStatus.buttonText
                );
                res.json({ buttonText: friendrequestStatus.buttonText });
            }
        })
        .catch((error) => console.log(error));
});

app.get("/sendRequest/:id", (req, res) => {
    console.log("req.body", req.body, "req.session.userId", req.session.userId);
    const userId = req.session.userId;
    const otheruser = req.params.id;
    console.log(
        "req.params",
        req.params,
        "req.session.userId",
        req.session.userId
    );
    sendRequest(otheruser, userId)
        .then((response) => {
            console.log("response", response);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("ERROR IN SENDING REQUEST: ", err);
        });
});

app.post("/acceptsFriendship/:id", (req, res) => {
    console.log("req.body", req.body, req.session.userId);
    const userId = req.session.userId;
    const otheruser = req.params.id;
    console.log("otheruser", otheruser);
    console.log("userId", userId);
    acceptsFriendship(otheruser, userId)
        .then((user) => {
            console.log("friendship accepted");
            // res.json({ success: true, message: user.score });
        })
        .catch((err) => {
            console.log("ERROR IN ACCEPTING FRIEND: ", err);
        });
});

app.post("/unfriendsFriendship/:id", (req, res) => {
    console.log("req.body", req.body, req.session.userId);
    const userId = req.session.userId;
    const otheruser = req.params.id;
    console.log("otheruser", otheruser);
    console.log("userId", userId);
    unfriendsFriendship(otheruser, userId)
        .then((user) => {
            console.log("unfriendsFriendship");
        })
        .catch((err) => {
            console.log("ERROR IN unfriendsFriendship: ", err);
        });
});
//catching the home page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

/*io.on("connection", function(socket) {
    const userId = socket.request.session.userId;
    console.log("socket id ${socket.id} is now connected to user ${userId}");


    socket.on(disconnect",() => {
        console.log("connection out! user
    })
});*/
app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
/*to use server.listen(process.env.PORT) instead app.listen for socket.io */
