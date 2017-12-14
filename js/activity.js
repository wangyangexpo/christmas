FastClick.attach(document.body);

$(function() {

    if (is_weixin()) {
        //wxShare(config.defaultshareurl, 0);
        $('.inweixin').show();
        joinGameByWX(function(res) {
            if (res.error_code == 0) {
                var master_uid = res.id;
                var url = config.shareurl + '?master_uid=' + master_uid;
                wxShare(url, 0)
                $('.container').on('click', '.begin', function() {
                    $('.mask').show();
                })
            }
        })
    } else {
        $('.check-code').show();
        if (is_mobike()) {
            mobikeShare(config.defaultshareurl, 0);
        }
    }

    $('.container').on('click', '.rule-title', function() {
        $('.rule-content').toggle();
    })

    $('.mask').on('click', function() {
        $('.mask').hide();
    })

    var _getcode = $('.getcode');
    var _phone = $('.phone');
    var _code = $('.code');
    var _commit = $('.commit');
    var telReg = /^1[0-9]{10}$/;

    _getcode.on('click', function() {
        var text = _getcode.text();
        var tel = $.trim(_phone.val());

        if (tel.length != 11 || !telReg.test(tel)) {
            alert('请输入正确的手机号');
            return;
        }
        if (text == '获取验证码') {
            countDown(60);
            joinGameByPhone(tel);
        } else {
            return;
        }
    })

    _commit.on('click', function() {
        var tel = $.trim(_phone.val());
        var code = $.trim(_code.val());
        console.log(tel, code);

        if (!tel) {
            alert('请输入手机号！');
            return;
        } else if (!code) {
            alert('请输入验证码！');
            return;
        }

        checkJoinCode(tel, code, function(res) {
            if (res.error_code == 0) {
                var master_uid = res.id;
                var url = config.shareurl + '?master_uid=' + master_uid;
                if (is_mobike()) {
                    mobikeShare(url, 0);
                    $('.mask').show();
                } else {
                    alert('你从哪里进来的呢？');
                }
            }
        })

        //$('.mask').show();
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
    var _count = $('.getcode').addClass('disable');
    var c = setInterval(function() {
        if (sec) {
            _count.text((sec - 1) + '秒');
        } else {
            _count.text('获取验证码').removeClass('disable');
            clearInterval(c);
        }
        sec--;
    }, 1000);
}