var books = require('google-books-search');

module.exports = function(bookTitle, callback){
	books.search(bookTitle, function(error, results){
		callback(error, results);
	});
}