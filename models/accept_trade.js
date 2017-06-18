var Book = require('./book').Book;
var Account = require('./account').Account;


module.exports = function(req){

	Account.update({ email: req.user.email }, {$pull: {"tradeRequestsPending": req.body.bookid } }, { safe: true, multi:true }, function(err, account){

	});

	Account.find({'tradeRequests': req.body.bookid }, function(err, account){
		Book.findById(req.body.bookid, function(req, book){
			account[0].booksInUser.push(book);
			account[0].save(function(err){
				if (err) return err;
			});
		});
	});


	Account.update({}, {$pull: {'tradeRequests': req.body.bookid } }, { safe: true, multi:true }, function(err, account){
		
	});

	

}