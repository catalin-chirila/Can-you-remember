var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");

router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

router.post('/signin', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

router.post('/score', function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.findOneAndUpdate(
            { username: req.body.username },
            {
                $push: {
                    score: {
                        level: req.body.level,
                        difficulty: req.body.difficulty,
                        date: req.body.date
                    }
                }
            },
            function (error, success) {
                if (error) {
                    if (error) return res.status(200).send(error);
                } else {
                    res.json({ success: true, msg: 'Save score succeeded.' });
                }
            }
        );
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.get('/score', function (req, res) {
    User.find(function (err, users) {
        if (err) return next(err);

        const scores = [];

        users.forEach(u => u.score.forEach(s => scores.push({
            username: u.username,
            level: s.level,
            difficulty: s.difficulty,
            date: s.date
        })));

        res.json(scores);
    });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;