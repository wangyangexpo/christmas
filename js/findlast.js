FastClick.attach(document.body);

$(function() {

	$(".snow-canvas").snow();

    $('.btn').on('click', function() {
        location.href = './activity.html';
    })
})