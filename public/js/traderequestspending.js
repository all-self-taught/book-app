function acceptTrade(book){
	$.ajax({
		url: 'http://localhost:8080/accepttrade',
		method: 'POST',
		data: 'bookid='+book
	});
	window.location.reload(false);
}