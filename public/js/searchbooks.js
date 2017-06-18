var books;

function addBook(number){
	$.ajax({
		url: 'http://localhost:8080/addbook',
		method: 'POST',
		data: books[number]
	})
}


$('#bookSearch').on('submit', function(e){

	e.preventDefault();
	var form = $(this);
	var data = form.serialize();

	$.ajax({
		url: 'http://localhost:8080/searchbooks',
		method: 'POST',
		data: data,
		success: function(results){

			var html = '';
			var i = 0;

			books = [];

			results.forEach(function(result){
				html += '<tr>';
				html += '<td><a href="#" onclick="addBook(' + i + ');">' + result.title + '</a></td>'
				html += '<td>'
				result.authors.forEach(function(author){
					html += author + '<br>'
				}); 
				html += '</td>'
				html += '<td>' + result.industryIdentifiers[0].identifier + '</td>'
				html += '<td><img src="' + result.thumbnail + '" /></td>'
				html += '</tr>'

				books.push({
					title: result.title,
					author: result.authors,
					ISBN: result.industryIdentifiers[0].identifier,
					photo: result.thumbnail
				});
				i++;
			});

			$('#search-books-body').html(html);
		}
	})

});