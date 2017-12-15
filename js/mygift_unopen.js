$(function() {
    var giftid = getData('custom_result');
    var nickname = getData('custom_nickname');

    preloadImages(giftid);
    
    $('.open-btn').on('click', function() {
        if (!giftid) {
            alert('非法进入！');
            return;
        }
        location.href = './mygift_opened.html?giftid=' + giftid + '&nickname=' + encodeURIComponent(nickname) + '&t=' + new Date().getTime();
    });
})

// 图片预加载
function preloadImages(giftid) {
	var src = '';
	if(giftid > 0 && giftid < 21) {
    	src = '../images/zhengshu/zhengshu_' + giftid + '.png';
    } else if(giftid == 101) {
    	src = '../images/opened/yueka.png';
    } else if(giftid == 102) {
    	src = '../images/opened/nianka.png';
    } else if(giftid == 104) {
		src = '../images/opened/jingche.png';
    } else {
    	return;
    }
    var img = document.createElement('img');
    img.src = src;
    img.onload = function() {
        this.onload = null;
    };
}