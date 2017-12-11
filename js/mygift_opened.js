FastClick.attach(document.body);
var giftlist = {
    '0': {
        name: '圣诞精灵证书',
        el: ['<img src="../images/zhengshu/zhengshu_','.png" alt="" class="zhengshu">'],
        pre: '1张',
    },
    '104': {
        name: '葡萄积木警车',
        el: '<img src="../images/opened/jingche.png" alt="" class="jingche">',
        pre: '1辆',
    },
    '101': {
        name: '摩拜单车月卡',
        el: '<img src="../images/opened/yueka.png" alt="" class="yueka">',
        pre: '1张',
    },
    '102': {
        name: '摩拜单车年卡',
        el: '<img src="../images/opened/nianka.png" alt="" class="nianka">',
        pre: '1张',
    }
}

$(function() {

    var _mgmask = $('#mgmask');
    var nickname = getQueryString('nickname') || '';
    var giftid = getQueryString('giftid') || 0;
    var isshare = getQueryString('isshare') || 0;
    var mb_code = getData('mb_code') || '';
    var gift;
    $('.wx-name').text(nickname + '，');
    if(giftid >= 0 && giftid <= 20) {
    	gift = giftlist[0];
    	gift.el = gift.el[0] + giftid + gift.el[1];
    } else {
    	gift = giftlist[giftid];
    	if(!gift) {
    		gift = giftlist[0];
    		gift.el = gift.el[0] + '0' + gift.el[1];
    	} else {
    		if(isshare == 0) {
    			$('.receive').show();
    		}
    		$('#lucky').addClass('find');
    	}
    }

    if(is_weixin()) {
        var url = config.shareorigin + 'html/mygift_opened.html?giftid=' + giftid + '&nickname=' + nickname + '&isshare=1';
        wxShare(url, 2, gift.pre + gift.name);
    }

    $('.gift-img').html(gift.el);
    $('.gift-name').html(gift.name);
    _mgmask.on('click', '.icon-close', function() {
        _mgmask.find('.bg-rotate,.gift-img>img').addClass('disappear');
        setTimeout(function() {
            _mgmask.hide();
        }, 1000);
    })

    var _getcode = $('.getcode');
    var _phone = $('.phone');
    var _code = $('.code');
    var _commit = $('.commit');
    var telReg = /^1[0-9]{10}$/;

    _getcode.on('click', function() {
    	var text = _getcode.text();
    	var tel = $.trim(_phone.val());

    	if(tel.length != 11 || !telReg.test(tel)) {
    		alert('请输入正确的手机号');
    		return;
    	}
    	if(text == '获取验证码') {
    		countDown(60);
            giftGetCode(tel);
    	} else {
    		return;
    	}
    })

    _commit.on('click', function() {
    	var tel = $.trim(_phone.val());
    	var code = $.trim(_code.val());
    	console.log(tel, code);

    	if(!tel) {
    		alert('请输入手机号！');
    		return;
    	} else if (!code) {
    		alert('请输入验证码！');
    		return;
    	}

        giftCheckCode(tel, code, function(res) {
            if(res.error_code == 0) {
                location.href = './mygift_receive.html?giftid=' + giftid + '&mb_code=' + mb_code + '&phone=' + tel +'&nickname=' + nickname;
            }
        })

    	//location.href = './mygift_receive.html';
    })
})

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function countDown(sec) {
	var _count = $('.getcode');
	var c = setInterval(function(){
		if(sec) {
			_count.text((sec - 1) + '秒');
		} else {
			_count.text('获取验证码');
			clearInterval(c);
		}
		sec--;
	}, 1000);
}