FastClick.attach(document.body);

var down_template = [
    '<div class="item left ptly"><div class="name">葡萄乐园<br/>扫码下载APP</div><div class="code code-ptly"><img src="../images/erweima/ptly.png" alt=""></div><div class="txt">在<span>葡萄乐园</span>app，使用抵用券，即可免费领取哦！</div></div>',
    '<div class="item left mb"><div class="name">摩拜<br/>微信公众号</div><div class="code code-mb"><img src="../images/erweima/mb.png" alt=""></div><div class="txt">长按扫描二维码，下载摩拜APP</div></div>'
]

var mid_template = [
    '<div class="txt-1">下载葡萄乐园APP<br/>下单即可0元获取</div>',
    '<div class="txt-2">进入摩拜APP-我的卡券-<br/>优惠码兑换-粘贴兑换码，<br/>即可成功兑换</div>'
]

var giftlist = {
    '103': {
        name: '葡萄积木芬兰圣诞老人',
        up_el: ['<div class="quan quan-st"></div><div class="quan-txt"><span class="name">葡萄积木圣诞老人抵用券</span>已存入您<br/><span class="phone">', '</span>的手机账户中</div>'],
        down_el: 0,
    },
    '104': {
        name: '葡萄积木警车',
        up_el: ['<div class="quan quan-jc"></div><div class="quan-txt"><span class="name">葡萄积木警车抵用券</span>已存入您<br/><span class="phone">', '</span>的手机账户中</div>'],
        down_el: 0,
    },
    '101': {
        name: '摩拜单车月卡',
        up_el: ['<div class="code code-m">', '</div><div class="copy">长按复制本券码</div><div class="code-txt">恭喜你获得<br/>价值<span class="name">30元的葡萄科技联名月卡</span>1张</div><div class="code-date">（兑奖时间：2017/12/12～2017/12/31）</div>'],
        down_el: 1,
    },
    '102': {
        name: '摩拜单车年卡',
        up_el: ['<div class="code code-m">', '</div><div class="copy">长按复制本券码</div><div class="code-txt">恭喜你获得<br/>价值<span class="name">365元的葡萄科技联名年卡</span>1张</div><div class="code-date">（兑奖时间：2017/12/12～2017/12/31）</div>'],
        down_el: 1,
    }
}

$(function() {
    var giftid = getQueryString('giftid');
    var nickname = getQueryString('nickname');
    var mb_code = getQueryString('mb_code') || '';
    var phone = getQueryString('phone') || '';

    var gift;
    if (!giftid) {
        alert('非法进入！');
    } else {
        gift = giftlist[giftid];
        if (!gift) {
            alert('非法进入！');
        } else {
            var uphtml, downhtml, midhtml;
            if (gift.down_el == 0) {
                uphtml = gift.up_el[0] + phone + gift.up_el[1];
                downhtml = down_template[0];
                midhtml = mid_template[0];
            } else {
                uphtml = gift.up_el[0] + mb_code + gift.up_el[1];
                downhtml = down_template[1];
                midhtml = mid_template[1];
            }

            $('.up_tpl').html(uphtml);
            $('.down_tpl').prepend(downhtml);
            $('.mid_tpl').prepend(midhtml);

            if (is_weixin()) {
                var url = config.shareorigin + 'html/mygift_opened.html?giftid=' + giftid + '&nickname=' + nickname + '&isshare=1';
                wxShare(url, 2, gift.pre + gift.name);
            }

        }
    }
})

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}