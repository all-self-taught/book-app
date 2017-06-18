function removeBook(number){
	$.ajax({
		url: 'http://localhost:8080/deletebook',
		method: 'DELETE',
		data: 'bookid=' + number,
	});
	window.location.reload(false);
}