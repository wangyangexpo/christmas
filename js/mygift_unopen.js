var imgList = [
    './images/zhengshu/zhengshu_1.png',
    './images/zhengshu/zhengshu_2.png',
    './images/zhengshu/zhengshu_3.png',
    './images/zhengshu/zhengshu_4.png',
    './images/zhengshu/zhengshu_5.png',
    './images/zhengshu/zhengshu_6.png',
    './images/zhengshu/zhengshu_7.png',
    './images/zhengshu/zhengshu_8.png',
    './images/zhengshu/zhengshu_9.png',
    './images/zhengshu/zhengshu_10.png',
    './images/zhengshu/zhengshu_11.png',
    './images/zhengshu/zhengshu_12.png',
    './images/zhengshu/zhengshu_13.png',
    './images/zhengshu/zhengshu_14.png',
    './images/zhengshu/zhengshu_15.png',
    './images/zhengshu/zhengshu_16.png',
    './images/zhengshu/zhengshu_17.png',
    './images/zhengshu/zhengshu_18.png',
    './images/zhengshu/zhengshu_19.png',
    './images/zhengshu/zhengshu_20.png',
]

$(function() {
    var giftid = getData('custom_result');
    var nickname = getData('custom_nickname');

    preloadImages(giftid);
    
    $('.open-btn').on('click', function() {
        if (!giftid) {
            alert('非法进入！');
            return;
        }
        location.href = './mygift_opened.html?giftid=' + giftid + '&nickname=' + encodeURIComponent(nickname);
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