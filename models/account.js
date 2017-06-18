var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: String,
    email: String,
    password: String,
    fullname: String,
    city: String,
    state: String,
    booksInUser: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    tradeRequests: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    tradeRequestsPending: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

var Account = mongoose.model('Account', accountSchema);

module.exports = {
	Account: Account
}