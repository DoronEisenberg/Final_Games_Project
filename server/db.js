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

module.exports = {
    authenticateUser,
    addUser,
    getUserDetails,
    getUserByEmail,
    findUserById,
};
