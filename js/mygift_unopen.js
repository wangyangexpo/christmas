$(function() {
    var giftid = getData('custom_result');
    var nickname = getData('nickname');
    $('.open-btn').on('click', function() {
        if (!giftid) {
            alert('非法进入！');
            return;
        }
        location.href = './mygift_opened.html?giftid=' + giftid + '&nickname=' + nickname;
    });
})