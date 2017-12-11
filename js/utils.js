// moke 测试数据
var test_res = {
    "error_code": 0,
    "error_msg": "",
    "master_info": { //主人信息
        //微信用户
        "nickname": "wangyangexpo",
        "headimgurl": "../images/test_avatar.jpeg",
        //手机用户
        // "nickname": "187****5353",
        // "headimgurl": "",
    },
    "custom_prize_status": 1, // 1 表示客人可以抽奖 0 表示客人已经抽过奖
    "custom_prize_info": {
        "position": 1, // 位置有3个 从左到右 1 2 3
        "result": 56, //抽奖结果
        "time": 151928323, //时间
    },
    "master_prize_status": 1, // 1 表示主人已经中奖了, 0 表示主人没有中奖
    "master_prize_info": {
        "result": 101, //抽奖结果
    },
    "prize_list": [{
            "headimgurl": "../images/test_avatar.jpeg",
            "nickname": "胖大海",
            "result": 1,
            "time": 151823123,
        },
        {
            "headimgurl": "../images/test_avatar.jpeg",
            "nickname": "小星星",
            "result": 103,
            "time": 151863124,
        },
    ],
    "master_result": 51, //51-73 || 103
    "custom_result": 102, //1-20 || 101,102,104
    "custom_nickname": 'xixihaha',
    "custom_code": 'test-8888999966664321',
    "id": 'WMYLWYXNXYXRDYY',

}

var test_mygift = {
    "error_code": 0,
    "error_msg": "",
    "master_info": {
        "headimgurl": "xxx.jpg",
        "nickname": "yyy",
        "id": 14,
        "status": 1 //1 已领奖 0未领奖
    },
    "prize_list": [{
            "result": 2,
            "time": 15812341234,
            "code": ""
        },
        {
            "result": 101,
            "time": 15812341234,
            "code": "test-8888999966664321"
        },
    ]
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function setData(obj) {
    for (var i in obj) {
        sessionStorage.setItem(i, JSON.stringify(obj[i]))
    }
}

function getData(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

function is_weixin() {
    if (config.is_test == true) {
        return config.is_weixin;
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function is_mobike() {
    if (config.is_test) {
        return config.is_mobike;
    }
    var ua = window.navigator.userAgent.toLowerCase()
    return (/mobike/).test(ua)
}

function mobikeShare(url, sid) {

    window.Mobike.menu('menu', {
        title: '分享'
    }, function() {
        window.Mobike.share('share', {
            title: config.sharetitle[sid],
            content: config.sharesubtitle[sid],
            url: url,
            img: config.shareicon,
            mask: '3',
            type: '12'
        })
    })
}

function ajaxGet(url, data, callback) {

    if (config.is_test) {
        if (test_res.error_code == 0) {
            callback ? callback(test_res) : null;
            
        } else {
            console.log(config.error[test_res.error_code] || '未知错误');
        }
        return;
    }
    $.ajax({
        type: 'get',
        xhrFields: {
            withCredentials: true
        },
        data: data,
        url: url,
        success: function(res) {
            if (res.error_code == 0) {
                console.log('success');
                callback ? callback(res) : null;
            } else {
                alert(config.error[res.error_code] || '未知错误');
            }
        }
    });
}

//微信授权
function authorization(callback) {
    var url = config.host + config.authorization;
    if (!is_weixin()) {
        console.log('not in wx!');
        return;
    }
    ajaxGet(url, {}, function() {
        config.is_auth = true;
        callback ? callback() : null;
    });
}

//手机号码参加游戏发送验证码
function joinGameByPhone(phone, callback) {
    var url = config.host + config.joinbyphone;
    ajaxGet(url, {
        mobile: phone
    }, callback);
}

//手机号码参加活动校验验证码
function checkJoinCode(phone, code, callback) {
    var url = config.host + config.joincheck;
    ajaxGet(url, {
        mobile: phone,
        code: code
    }, callback);
}

//通过微信号参加游戏
function joinGameByWX(callback) {
    var url = config.host + config.joinbyweixin;
    if (config.is_auth) {
        ajaxGet(url, {}, callback);
    } else {
        authorization(function() {
            ajaxGet(url, {}, callback);
        })
    }
}

//进入分享页获取数据的接口
function getAssistList(master_uid, callback) {
    var url = config.host + config.prizelist;
    if (config.is_auth) {
        ajaxGet(url, {
            master_uid: master_uid
        }, callback);
    } else {
        authorization(function() {
            ajaxGet(url, {
                master_uid: master_uid
            }, callback);
        })
    }
}

// 领取奖品发送手机验证码
function giftGetCode(phone, callback) {
    var url = config.host + config.prizebind;
    ajaxGet(url, {
        mobile: phone
    }, callback);
}

// 领取奖品校验手机验证码
function giftCheckCode(phone, code, callback) {
    var url = config.host + config.bindcheck;
    ajaxGet(url, {
        mobile: phone,
        code: code
    }, callback);
}

// 帮助页面查看我的奖品（仅限微信用户）
function checkMyGift(callback) {
    if (config.is_test) {
        callback(test_mygift);
        return;
    }
    var url = config.host + config.giftlist;
    if (config.is_auth) {
        ajaxGet(url, {}, callback);
    } else {
        authorization(function() {
            ajaxGet(url, {}, callback);
        })
    }
}

// 客人助力
function openGift(master_uid, position, callback) {
    var url = config.host + config.prize;
    ajaxGet(url, {
        master_uid: master_uid,
        position: position
    }, callback);
}

// 获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//微信分享初始化
function wxShare(url, sid, param) {

    //微信分享需要用到的接口
    var jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
    var weixinUrl = location.href.split('#')[0];

    //分享出去的大标题
    var title = config.sharetitle[sid];
    //分享出去之后小字部分的明细标题
    var sec = config.sharesubtitle[sid];
    if (param) {
        title = title.replace('xxx', param);
    }
    //分享出去的icon
    var icon = config.shareicon;
    //分享出去的链接
    var shareLink = url;

    if (config.is_test) {
        console.log(title);
        console.log(sec);
        console.log(icon);
        console.log(shareLink);
        return;
    }

    $.ajax({
        data: {
            data: JSON.stringify({ url: weixinUrl })
        },
        type: "get",
        url: config.host + config.wxsdk,
        success: function(res) {
            if (res.error_code == 0) {
                var r = res.data;
                wx.config({
                    debug: false,
                    appId: r.appId,
                    timestamp: r.timestamp,
                    nonceStr: r.nonceStr,
                    signature: r.signature,
                    jsApiList: jsApiList
                });

            } else {
                alert('获取微信接口信息失败！');
            }
        }
    });

    wx.ready(function() {

        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: icon, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: sec, // 分享描述
            link: shareLink, // 分享链接
            imgUrl: icon, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

    });

    wx.error(function(res) {
        console.log(res);
    });
}

if (is_weixin()) {
    if (getCookie('uid') && getCookie('token')) {
        config.is_auth = true;
    } else {
        authorization();
    }

    wxShare(config.defaultshareurl, 0);
} else if (is_mobike()) {
    mobikeShare(config.defaultshareurl, 0);
}