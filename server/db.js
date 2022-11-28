// ----------------------------------------- Setup
const spicedPg = require("spiced-pg");
const { USER, PASSWORD } = process.env;

const user = USER;
const password = PASSWORD;
const database = "socialnetwork";

console.log(`postgres:${user}:${password}@localhost:5432/${database}`);

const db = spicedPg(
    process.env.DATABASE ||
        `postgres:${user}:${password}@localhost:5432/${database}`
);

//-----------------------------------------  Database Functions

////-----------------------------------------   Create User
function addUser({ firstname, lastname, email, password }) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
        [firstname, lastname, email, password]
    );
}

////-----------------------------------------  Get User Login Details

function getUserDetails(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
    // .then((result) => result.rows[0]);
}

module.exports = {
    addUser,
    getUserDetails,
};
