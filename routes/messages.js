var express = require('express');
var router = express.Router();

var Inbox = require('../models/inbox');


router.route('/send')
	//creates a advertiser
	.post(function (req, res) {

		console.log(req.body);

		var inbox = new Inbox();

			inbox.from=req.body.sender;
			inbox.to=req.body.receiver;
			inbox.text=req.body.message;
			inbox.read=false;
    
		inbox.save(function (err, updatedInbox) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(updatedInbox);
		});
	});
	
	
  router.route('/view/:owner')
	//gets all advertisers
	.get(function (req, res) {
		console.log('debug1');


    Inbox.find({ "to": req.params.owner}, function (err, inbx) {
			console.log('debug2');
			if (err) {
				return res.status(500).send(err);
			}
      return res.status(200).send(inbx);
		});

	});


module.exports = router;



//TODO reply