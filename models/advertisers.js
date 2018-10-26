var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AdvertisersSchema = new Schema(
  {
    first_name: {type: String,  max: 100},
    last_name: {type: String,  max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 600},
    products: [{type: String,  max: 100}], //Products types need to be standardized for search
    jobsPosted:[{type: Schema.Types.ObjectId, ref: 'Job'}],
    desc: {type: String,  max: 500},
    type: {type: String,  max: 100}
    //photo : {type: String,  max: 500}
  }
);

// Virtual for author's full name
AdvertisersSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for author's URL
AdvertisersSchema
.virtual('url')
.get(function () {
  return '/advertisers/' + this._id;
});

//Export model
module.exports = mongoose.model('Advertiser', AdvertisersSchema);
