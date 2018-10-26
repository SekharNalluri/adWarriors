var express = require('express');
var router = express.Router();


module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		console.log("success");
		res.status(200).send({state: 'success', user: req.user});
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.status(200).send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	router.get('/signup/failure', function(req, res){
		res.status(200).send({state: 'failure', user: null, message: "User already exists with username"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/signup/failure'
	}));

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;

}

//login
//sign up

//forgot password
