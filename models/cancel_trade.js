var Book = require('./book').Book;
var Account = require('./account').Account;


module.exports = function(req){

	Account.update({ email: req.user.email }, {$pull: {'tradeRequests': req.body.bookid } }, { safe: true, multi: true }, function(err, account){
		if (account){
			console.log('Canceling Trade');
		}
	});

}