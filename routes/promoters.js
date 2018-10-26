var express = require('express');
var router = express.Router();

var Promoter = require('../models/promoters');


router.route('/create')
	//creates a advertiser
	.post(function (req, res) {

		var promoter = new Promoter();
		promoter.first_name = req.body.first_name;
		promoter.last_name = req.body.last_name;
		promoter.username = req.body.username;
		promoter.password = req.body.password;
		promoter.gender = req.body.gender;
		promoter.location = req.body.location;
		promoter.age = req.body.age;
		promoter.productsIntrested = req.body.productsIntrested;
		promoter.jobsOwned = req.body.jobsOwned
		promoter.desc = req.body.desc;

		promoter.save(function (err, promoter) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(201).send(promoter);
		});
	})
	//gets all advertisers
	.get(function (req, res) {
		console.log('debug1');

		Promoter.find(function (err, promoters) {
			console.log('debug2');
			if (err) {
				console.log('Database error', err);
				return res.status(500).send(err);
			}
			return res.status(200).send(promoters);
		});
	});


	router.route('/:id').get(function (req, res) {

		Promoter.find({"_id":req.params.id},function (err, promoters) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(promoters);
		});
	});
	

	router.route('/update')
	//creates a advertiser
	.post(function (req, res) {		
		Promoter.findOneAndUpdate(req.body._id, {
			$set: {
				first_name : req.body.first_name,
				last_name : req.body.last_name,
				gender : req.body.gender,
				location : req.body.location,
				age : req.body.age,
				productsIntrested : req.body.products,
				desc : req.body.desc,

			}},{new:true,runValidators:true},function (err, promoter) {
			if (err) {
				console.log(err)
				return res.status(500).send(err);
			}
			return res.status(200).send(promoter);
		})

	})

	router.route('/products/:product').get(function (req, res) {

		Promoter.find({"productsIntrested":{ $in: [req.params.product]}},function (err, promoter) {
			console.log('debug2');
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(promoter);
		});
	})
	


module.exports = router;
