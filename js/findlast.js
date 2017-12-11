FastClick.attach(document.body);

$(function() {
	var time = 1;
	$('.btn').on('click', function() {
		if(time == 2) {
			location.href = './activity.html';
		} else {
			time++;
			$('.txt').html('<p>啊欧！少了一块哟～</p><p>邀请朋友一起找到它，</p><p>赢芬兰机票～</p>')
			$('.btn').text('去找积木');
		}
	})
})