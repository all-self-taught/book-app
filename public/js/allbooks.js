function requestBook(book){
	$.ajax({
		url: 'http://localhost:8080/requesttrade',
		method: 'POST',
		data: 'bookid='+book
	})
	window.location.reload(false);
}