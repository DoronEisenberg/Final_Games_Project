// ----------------------------------------- Setup
const spicedPg = require("spiced-pg");
const { USER, PASSWORD } = process.env;

const user = USER;
const password = PASSWORD;
const database = "online_games";

console.log(`postgres:${user}:${password}@localhost:5432/${database}`);

const db = spicedPg(
    process.env.DATABASE ||
        `postgres:${user}:${password}@localhost:5432/${database}`
);

//-----------------------------------------  Database Functions

////-----------------------------------------   Create User
function addUser({ firstname, lastname, email, password }) {
    console.log("HERE?");
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
        [firstname, lastname, email, password]
    );
}

////-----------------------------------------   Get user data

function findUserById(userId) {
    return db
        .query("SELECT * FROM users WHERE id=$1", [userId])
        .then((results) => {
            if (results.rows.length == 0) {
                throw new Error("id does not exist");
            }
            return results.rows[0];
        })
        .catch((err) => console.log(err));
}

////-----------------------------------------  Get User Login Details

function getUserDetails(email) {
    return db
        .query("SELECT * FROM users WHERE email=$1", [email])
        .then((results) => {
            if (results.rows.length == 0) {
                throw new Error("email does not exist");
            }
            return results.rows[0];
        })
        .catch((err) => console.log(err));
}

function authenticateUser({ email, password }) {
    return function getUserDetails(email) {
        console.log(email);
        email.then((user) => {
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("password incorrect");
            }
            return user;
        });
    };
}
function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1 ", [email])
        .then((result) => {
            console.log("user by email db, ", result.rowCount);
            console.log("email doesnt exist");
            if (result.rowCount === 0) {
                console.log("email doesnt exist");
                return false;
            }
            console.log("user by email db, ", result.rows[0]);
            return result.rows[0];
        })
        .catch((error) => console.log(error));
}

function addProfilePic(url, id) {
    //console.log("url, id", url, id);
    return db
        .query(
            `UPDATE users 
            SET profilepic_url=$1 WHERE id=$2
    RETURNING *`,
            [url, id]
        )
        .then((result) => {
            console.log("result", result.rows[0]);
            return result.rows[0];
        });
}

function addScore(score, id) {
    console.log("score, id", score, id);
    return db
        .query(
            `UPDATE users 
            SET score=$1 WHERE id=$2
    RETURNING *`,
            [score, id]
        )
        .then((result) => {
            console.log("result.rows[0]", result.rows[0]);
            return result.rows[0];
        });
}

function getThreeNewestUsers() {
    return db
        .query(
            `SELECT id, firstname, lastname, profilepic_url FROM users ORDER BY created_at DESC LIMIT 3`
        )
        .then((users) => users.rows);
}

function getOthersBySearchQuery(searchQuery) {
    return db
        .query(
            `SELECT id, firstname, lastname, profilepic_url FROM users WHERE firstname ILIKE $1 
        OR lastname ILIKE $1 
        ORDER BY created_at DESC`,
            ["%" + searchQuery + "%"]
        )
        .then((users) => users.rows);
}

//function to get OTHR PROFILE data by ID
function getOtherProfileByIDParam(id) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [id])
        .then((otherUser) => otherUser.rows[0]);
}
/////////  FRIEND BUTTON  ///////
function getFriendship(sender, recipient) {
    return db
        .query(
            `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
            [sender, recipient]
        )
        .then((results) => {
            return results.rows;
        });
}

function sendRequest(recipient, sender) {
    return db.query(
        `INSERT INTO friendships(recipient_id, sender_id)
    VALUES ($1, $2) RETURNING *`,
        [recipient, sender]
    );
}

function acceptsFriendship(recipient, sender) {
    // console.log(recipient, sender);
    return db.query(
        `UPDATE friendships SET accepted =true WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
        [recipient, sender]
    );
}

function unfriendsFriendship(recipient, sender) {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (recipient_id = $1 AND sender_id = $2)`,
        [recipient, sender]
    );
}

module.exports = {
    authenticateUser,
    addUser,
    getUserDetails,
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
};
