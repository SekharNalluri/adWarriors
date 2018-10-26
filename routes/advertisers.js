var express = require('express');
var router = express.Router();

var Advertiser = require('../models/advertisers');


router.route('/create')
	//creates a advertiser
	.post(function (req, res) {

		var advertiser = new Advertiser();
		advertiser.first_name = req.body.first_name;
		advertiser.last_name = req.body.last_name;
		advertiser.username = req.body.username;
		advertiser.password = req.body.password;
		advertiser.products = req.body.products;
		advertiser.jobsPosted = req.body.jobsPosted;
		advertiser.desc = req.body.desc;

		advertiser.save(function (err, advertiser) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(201).send(advertiser);
		});
	})
	//gets all advertisers
	.get(function (req, res) {
		console.log('debug1');

		Advertiser.find(function (err, advertisers) {
			console.log('debug2');
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(advertisers);
		});
	});


router.route('/:id').get(function (req, res) {

	Advertiser.find({"_id":req.params.id},function (err, advertisers) {
		console.log('debug2');
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).send(advertisers);
	});
});

router.route('/products/:product').get(function (req, res) {

	Advertiser.find({"products":{ $in: [req.params.product]}},function (err, advertisers) {
		console.log('debug2');
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).send(advertisers);
	});
})


router.route('/update')
//creates a advertiser
.post(function (req, res) {		
	Advertiser.findOneAndUpdate(req.body._id, {
		$set: {
			first_name : req.body.first_name,
			last_name : req.body.last_name,
			products : req.body.products,
			desc : req.body.desc,

		}},{new:true,runValidators:true},function (err, advertiser) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}
		return res.status(200).send(advertiser);
	})

})
 

//search
//authenticate
//update


module.exports = router;