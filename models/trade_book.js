var Book = require('./book').Book;
var Account = require('./account').Account;

module.exports = function(req){

	Book.findById(req.body.bookid, function(err, book){
		
		Account.find({booksInUser: { _id: req.body.bookid } }, function(err, account){

			account[0].tradeRequestsPending.push(book);
			account[0].save(function(err){
				if (err) return err;
			});

		});

		Account.findOne({ email: req.user.email }, function(err, account){
			account.tradeRequests.push(book);
			account.save(function(err){
				if (err) return err;
			});
		});
	});

}