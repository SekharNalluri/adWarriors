var express = require('express');
var router = express.Router();

var Job = require('../models/jobs');



router.route('/create')
	//creates a advertiser
	.post(function (req, res) {
    console.log(req)

    var job = new Job();
    
    job.advertiser  = req.body.advertiser;
    job.promoter = req.body.promoter;
    job.status  = req.body.status;
    job.product  = req.body.product;
    job.shortDesc  = req.body.shortDesc;
    job.paymentMethod  = req.body.paymentMethod;
    job.paymentType  = req.body.paymentType;
    job.payPerUnit  = req.body.payPerUnit;

		job.save(function (err, advertiser) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(201).send(advertiser);
		});
	})
	//gets all advertisers
	.get(function (req, res) {
		console.log('debug1');
		Job.find(function (err, jobs) {
			console.log('debug2');
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(jobs);
		});
	});


  router.route('/products/:product').get(function (req, res) {

    Job.find({"product":{ $in: [req.params.product]}},function (err, jobs) {
      console.log('debug2');
      if (err) {
        return res.status(500).send(err);
      }
      console.log(jobs)
      return res.status(200).send(jobs);
    });
  })



router.route('/search')
//creates a advertiser
.post(function (req, res) {

  var job = new Job();
  
  job.advertizer  = req.body.advertizer;
  job.promoter = req.body.promoter;
  job.status  = req.body.status;
  job.product  = req.body.product;
  Job.find(job, function (err, jobs) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send(jobs);
  });
});

router.route('/update')
//creates a advertiser
.post(function (req, res) {

  var job = new Job();
  
  job.advertizer  = req.body.advertizer;
  job.promoter = req.body.promoter;
  job.status  = req.body.status;
  job.product  = req.body.product;
  Job.find(job, function (err, jobs) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send(jobs);
  });
});



module.exports = router;

//status update
//think about intrested promoters or bids