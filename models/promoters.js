var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PromotersSchema = new Schema(
  {
    first_name: {type: String, max: 100},
    last_name: {type: String,  max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 600},
    gender: {type: String,  enum: ['Male', 'Female', 'Transgender']},
    location : {type: String,  max: 100},//location need to be standardized for search
    age: { type: Number, min: 18, max: 80 },
    productsIntrested: [{type: String,  max: 100}], //Products types need to be standardized for search
    jobsOwned:[{type: Schema.Types.ObjectId, ref: 'Job'}],
    desc: {type: String,  max: 500},
    type: {type: String,  max: 100}
    //photo : {type: String,  max: 500}
  }
);

// Virtual for author's full name
PromotersSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
PromotersSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's URL
PromotersSchema
.virtual('url')
.get(function () {
  return '/promoters/' + this._id;
});

//Export model
module.exports = mongoose.model('Promoter', PromotersSchema);
