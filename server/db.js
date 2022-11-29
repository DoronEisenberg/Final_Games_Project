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
        email.then((user) => {
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("password incorrect");
            }
            return user;
        });
    };
}

module.exports = {
    authenticateUser,
    addUser,
    getUserDetails,
};
