var Book = require('./book').Book;
var Account = require('./account').Account;


module.exports = function(req){

	Account.findOne({ email: req.user.email }, function(err, account){
	
		var book = new Book({
				title: req.body.title, 
				author: req.body.author, 
				ISBN: req.body.ISBN, 
				photo: req.body.photo
			});

		book.save(function(err){
			if (err) return err;
		});

		account.booksInUser.push(book);
		account.save(function(err){
			if (err) return err;
		});

	});
}