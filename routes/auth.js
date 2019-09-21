var express = require('express');
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('login');
});


/* GET signup page. */
router.get('/signup', function (req, res, next) {
    res.render('signup');
});

/* Send signup data*/

router.post('/signup', async function (req, res, next) {
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, saltRounds)
    try {
        if (username && password) {
            User.create({ username, password })
                .then(() => {
                    res.redirect("/auth/login")
                })
        } else {
            req.app.locals.error = "Put in password and name";
            res.redirect("/auth/signup");
        }
    }
    catch (err) {
        console.log("Error", err)
    }
})

module.exports = router;