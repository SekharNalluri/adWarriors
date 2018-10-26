var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var InboxSchema = new Schema(
  {
    to: {type: String, required: true, max: 100},
    from: {type: String, required: true, max: 100},
    text : {type: String, required: true, max: 500},
    sentAt: { type: Date, default: Date.now },
    read: Boolean
  }
);

// Virtual for author's full name
InboxSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for author's URL
InboxSchema
.virtual('url')
.get(function () {
  return '/advertisers/' + this._id;
});

//Export model
module.exports = mongoose.model('Inbox', InboxSchema);