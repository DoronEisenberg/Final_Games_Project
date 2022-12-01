function requireLoggedOutUser(req, res, next) {
    if (req.session.userId) {
        res.redirect("/user/id.json");
    } else {
        next();
    }
}

module.exports.requireLoggedOutUser = requireLoggedOutUser;
