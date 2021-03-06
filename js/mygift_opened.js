FastClick.attach(document.body);
var giftlist = {
    '0': {
        name: '圣诞老人送的圣诞精灵证书',
        el: ['<img src="../images/zhengshu/zhengshu_','.png" alt="" class="zhengshu">'],
        pre: '1张',
        desc: '',
    },
    '104': {
        name: '葡萄积木《布布百变警车》',
        el: '<img src="../images/opened/jingche.png" alt="" class="jingche">',
        pre: '1辆',
        desc: '获得了葡萄积木《布布百变警车》',
    },
    '101': {
        name: '价值30元葡萄积木联名摩拜骑行卡1张',
        el: '<img src="../images/opened/yueka.png" alt="" class="yueka">',
        pre: '1张',
        desc: '获得了价值30元<br/>葡萄积木联名摩拜骑行卡1张',
    },
    '102': {
        name: '价值365元葡萄积木联名摩拜骑行卡1张',
        el: '<img src="../images/opened/nianka.png" alt="" class="nianka">',
        pre: '1张',
        desc: '获得了价值365元<br/>葡萄积木联名摩拜骑行卡1张',
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
    		gift.el = gift.el[0] + '1' + gift.el[1];
    	} else {
    		if(isshare == 0) {
    			$('.receive').show();
    		}
    	}
    }

    var img = $(gift.el);
    $('.gift-img').append(img);
    $('.gift-name').text(gift.name);
    $('.gift-desc').html(gift.desc);

    if(is_weixin()) {
        var url = config.shareorigin + 'html/mygift_opened.html?giftid=' + giftid + '&nickname=' + encodeURIComponent(nickname) + '&isshare=1';
        wxShare(url, 2, gift.pre + gift.name);
    }

    _mgmask.on('click', function() {
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
    	if(!_getcode.hasClass('disable')) {
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
                location.href = './mygift_receive.html?giftid=' + giftid + '&mb_code=' + mb_code + '&phone=' + tel +'&nickname=' + encodeURIComponent(nickname) + '&t=' + new Date().getTime();
            }
        })

    	//location.href = './mygift_receive.html';
    })
})

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

function countDown(sec) {
	var _count = $('.getcode').addClass('disable');
	var c = setInterval(function(){
		if(sec) {
			_count.text((sec - 1) + '秒');
		} else {
			_count.text('获取验证码').removeClass('disable');
			clearInterval(c);
		}
		sec--;
	}, 1000);
}