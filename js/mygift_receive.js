FastClick.attach(document.body);

var down_template = [
    '<div class="item left ptly"><div class="name">葡萄乐园<br/>扫码下载APP</div><div class="code code-ptly"><img src="../images/erweima/ptly.png" alt=""></div><div class="txt">在<span>葡萄乐园</span>app，使用兑换券，即可免费领取哦！</div></div>',
    '<div class="item left mb"><div class="name">摩拜单车<br/>APP</div><div class="code code-mb"><img src="../images/erweima/mb.png" alt=""></div><div class="txt">长按扫描二维码，下载摩拜单车APP</div></div>'
]

var mid_template = [
    '<div class="txt-2">下载葡萄乐园app-找到奖品-<br/>加入购物车-使用兑换券-<br/>0元获得奖品</div>',
    '<div class="txt-2">进入摩拜单车APP-我的卡券-<br/>优惠码兑换-粘贴兑换码，<br/>即可成功兑换</div>'
]

var giftlist = {
    '103': {
        name: '葡萄积木芬兰圣诞老人',
        up_el: ['<div class="quan quan-st"></div><div class="quan-txt"><span class="name">葡萄积木全球限量版圣诞老人兑换券</span>已存入您<span class="phone">', '</span>的手机账户中</div>'],
        down_el: 0,
        pre: '1个',
    },
    '104': {
        name: '葡萄积木《布布百变警车》',
        up_el: ['<div class="quan quan-jc"></div><div class="quan-txt"><span class="name">葡萄积木警车兑换券</span>已存入您<span class="phone">', '</span>的手机账户中</div>'],
        down_el: 0,
        pre: '1辆',
    },
    '101': {
        name: '价值30元葡萄积木联名摩拜骑行卡1张',
        up_el: ['<div class="code code-m">', '</div><div class="copy">长按复制本券码</div><div class="code-txt">恭喜你获得<br/>价值<span class="name">30元葡萄积木联名摩拜骑行卡</span>1张</div><div class="code-date">（兑奖时间：2017/12/12～2017/12/31）</div>'],
        down_el: 1,
        pre: '1张',
    },
    '102': {
        name: '价值365元葡萄积木联名摩拜骑行卡1张',
        up_el: ['<div class="code code-m">', '</div><div class="copy">长按复制本券码</div><div class="code-txt">恭喜你获得<br/>价值<span class="name">365元葡萄积木联名摩拜骑行卡</span>1张</div><div class="code-date">（兑奖时间：2017/12/12～2017/12/31）</div>'],
        down_el: 1,
        pre: '1张',
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
                var url = config.shareorigin + 'html/mygift_opened.html?giftid=' + giftid + '&nickname=' + encodeURIComponent(nickname) + '&isshare=1';
                wxShare(url, 2, gift.pre + gift.name);
            }

        }
    }
})

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}