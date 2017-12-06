FastClick.attach(document.body);

$(function() {
	$('.trigger').on('click', function() {
		$('.desc').toggleClass('close');
	})
})