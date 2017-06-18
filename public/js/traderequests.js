function cancelTrade(book){
	$.ajax({
		url: 'http://localhost:8080/canceltrade',
		method: 'POST',
		data: 'bookid='+book
	});
	window.location.reload(false);
}