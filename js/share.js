FastClick.attach(document.body);

template.helper('dateFormat', function(date) {
    var format = "MM/dd hh:mm";
    date = new Date(date * 1000);
    var map = {
        "M": date.getMonth() + 1, //月份   
        "d": date.getDate(), //日   
        "h": date.getHours(), //小时   
        "m": date.getMinutes(), //分   
        "s": date.getSeconds(), //秒   
        "q": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };

    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
})

template.helper('trim', function(str) {
    return $.trim(str);
})

template.helper('giftName', function(giftid) {
    return config.wish[giftid];
})

$(function() {

    $(".snow-canvas").snow();

    var master_uid = getQueryString('master_uid');

    getAssistList(master_uid, function(res) {
        if (res.error_code == 0) {
            var nickname = $.trim(res.master_info.nickname);

            setData({
                nickname: res.master_info.nickname
            });

            var headimgurl = res.master_info.headimgurl;
            var html;
            $('.nickname').text('（' + nickname + '）');

            var master = {
                status: res.master_prize_status,
                data: res.master_prize_info,
            };

            if (master.status == 0 || master.data.result != 103) {
                
                // 帮助人分享，邀请助力
                var url = window.location.href;
                wxShare(url, 1, nickname);

                //主人没中奖，或者中的不是圣诞老人
                var custom = {
                    status: res.custom_prize_status,
                    data: res.custom_prize_info,
                };

                html = template('box_tpl', custom);
                $('.box').html(html).show();

                if (custom.status == 1) {
                    bindOpenGift(master_uid);
                }
            } else {
                // 主人中奖了
                $('#santa_claus').addClass('done');
                $('.box').addClass('find').show();
                $('.content').find('.title').addClass('find');
                if (headimgurl) {
                    // 主人是微信用户获取当前访问的微信uid
                    joinGameByWX(function(response) {
                        if (response.error_code == 0 && response.id == master_uid) {
                            $('.check-code').show();
                        }
                    })

                } else {
                    // 主人是手机用户
                    $('.no-check').show();
                }

                bindGiftCheck();

            }

            if (res.prize_list && res.prize_list.length > 0) {
                html = template('assist_tpl', {
                    assistlist: res.prize_list
                });
                $('.assist-wrap').html(html);
            }
        }
    })

})

// 主人没有中奖，客人没有抽奖，绑定开箱子操作
function bindOpenGift(master_uid) {
    $('.box').on('click', '.normal', function() {
        var index = parseInt($(this).index());
        var position = index + 1;
        var html;
        openGift(master_uid, position, function(res) {
            var master_result = res.master_result;
            var custom_result = res.custom_result;
            var custom_nickname = $.trim(res.nickname);
            var mb_code = res.custom_code || '';
            setData({
                custom_nickname: custom_nickname,
                custom_result: custom_result,
                mb_code: mb_code,
            })

            // 弹出层改变
            html = template('gift_tpl', {
                giftid: master_result,
                gifttext: config.wish[master_result],
            });
            $('.gift-wrap').html(html);
            $('#ogmask').show();

            // 原来的界面改变
            html = template('box_tpl', {
                status: 0,
                data: {
                    position: position,
                    result: master_result,
                }
            });
            $('.box').html(html).show();

        })


    });

    $('#ogmask').on('click', '.tellhim', function() {
        // 告诉他
        $('#tmask').show();
    }).on('click', '.leave', function() {
        // 离开页面
        $('#ogmask').hide();
        setTimeout(function() {
            location.href = './mygift_unopen.html';
        }, 1000);
    })

    $('#tmask').on('click', function() {
        $('#tmask').hide();
    })
}

// 主人中奖了，绑定相关领奖操作
function bindGiftCheck() {
    var _getcode = $('.getcode');
    var _phone = $('.phone');
    var _code = $('.code');
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
            giftGetCode(tel);
        } else {
            return;
        }
    })

    $('.check-code').on('click', '.commit', function() {
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

        giftCheckCode(tel, code, function(res) {
            if (res.error_code == 0) {
                location.href = './mygift_receive.html?giftid=103&phone=' + tel;
            }
        })

    });

    $('.no-check').on('click', '.commit', function() {
        location.href = './mygift_receive.html?giftid=103&phone=' + getData('nickname');
    })
}


function countDown(sec) {
    var _count = $('.getcode');
    var c = setInterval(function() {
        if (sec) {
            _count.text((sec - 1) + '秒');
        } else {
            _count.text('获取验证码');
            clearInterval(c);
        }
        sec--;
    }, 1000);
}