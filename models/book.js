var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    ISBN: String,
    photo: String
});

var Book = mongoose.model('Book', bookSchema);

module.exports = {
	Book: Book
}