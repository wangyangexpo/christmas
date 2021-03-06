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

template.helper('giftName', function(giftid) {
    return config.wish[giftid];
})

$(function() {
    if (is_weixin()) {
        checkMyGift(function(res) {
            console.log(res.id);
            if (res.error_code == 0) {
                var giftlist = res.prize_list;
                var nickname = $.trim(res.master_info.nickname);
                var mobile = res.master_info.mobile;
                var giftstatus = res.master_info.status;
                var master_uid = res.master_info.id;
                render(giftlist, nickname, master_uid, giftstatus, mobile);
            }
        })
    }
    $('.join').on('click', function() {
        location.href = './activity.html?t=' + new Date().getTime();
    })
})

function render(giftlist, nickname, master_uid, giftstatus, mobile) {
	console.log(giftlist);
    if (!giftlist || giftlist.length == 0) {
        return;
    }
    var html = template('assist_tpl', {
        giftlist: giftlist,
        giftstatus: giftstatus
    });
    $('.help').html(html);

    $('.help').on('click', '.yes', function() {
    	var giftid = $(this).data('result');
    	var url_1 = './mygift_opened.html?giftid=' + giftid + '&nickname=' + encodeURIComponent(nickname);
    	var url_2 = './share.html?master_uid=' + master_uid;
    	if(giftid == 101 || giftid == 102 || giftid == 104) {
    		var code = $(this).data('code');
    		setData({'mb_code': code});
    		location.href = url_1 + '&t=' + new Date().getTime();
    	} else if (giftid == 103) {
    		location.href = url_2 + '&t=' + new Date().getTime();
    	}
    })

    $('.help').on('click', '.no', function() {
        var giftid = $(this).data('result');
        var mb_code = $(this).data('code');
        var url_1 = './mygift_receive.html?giftid=' + giftid + '&phone=' + mobile + '&mb_code=' + mb_code + '&nickname=' + encodeURIComponent(nickname);
        var url_2 = './share.html?master_uid=' + master_uid;
        if(giftid == 101 || giftid == 102 || giftid == 104) {
            location.href = url_1 + '&t=' + new Date().getTime();
        } else if (giftid == 103) {
            location.href = url_2 + '&t=' + new Date().getTime();
        }
    })
}