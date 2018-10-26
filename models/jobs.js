var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobsSchema = new Schema(
  {
    advertiser:{type: Schema.Types.ObjectId, ref: 'Advertizer'},
    promoter:{type: Schema.Types.ObjectId, ref: 'Promoter'},
    product:{type: String, required: true, max: 100},
    createdAt:{ type: Date, default: Date.now },
    status:[],
    shortDesc:{type: String, required: true, max: 500},
    paymentMethod:[],
    paymentType: [],
    payPerUnit:{}
  }
);


// Virtual for author's URL
JobsSchema
.virtual('url')
.get(function () {
  return '/jobs/' + this._id;
});

//Export model
module.exports = mongoose.model('Job', JobsSchema);
