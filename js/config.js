var baseUrl = 'https://web-huodong.putaocdn.com/';

window.config = {

    version: 'v201712141800',

    is_test: false,

    is_weixin: false,

    is_mobike: true,

    // 下面是项目用到的固定参数，不需要改动
    is_auth: false,

    jsbridge: 'https://static.mobike.com/cdn/jsbridge/1.1.1/jsbridge.js',

    wxsdk: '/jsApiConfig',

    host: 'https://mobahuodong.putao.com',

    authorization: '/authorization',

    joinbyphone: '/fromOtherJoin',

    joincheck: '/fromOtherJoinCheck',

    joinbyweixin: '/fromWxJoin',

    prizelist: '/prizeList',

    prize: '/prize',

	prizebind: '/bind',

	bindcheck: '/bindCheck',

    giftlist: '/myPrizeList',

    shareorigin: baseUrl + 'christmas/',

    defaultshareurl: baseUrl + 'christmas/index.html',

    shareicon: baseUrl + 'christmas/images/share/icon_share.png',

    shareurl: baseUrl + 'christmas/html/share.html',

    notfound: baseUrl + 'christmas/html/notfound.html',

    authurl: 'https://mobahuodong.putao.com/authorization',

    sharetitle: {
        0: '葡萄积木携手摩拜单车，送你去芬兰！',
        // 这两个是固定不动的
        1: '邀请你一起为xxx助力，赢取芬兰机票！',
        2: '我刚刚通过助力，瓜分了xxx',
        // 不带主人信息的分享
        4: '【瓜分圣诞大礼】葡萄积木携手摩拜单车，任性送大礼！',
        5: '【芬兰机票躺着赢】葡萄积木携手摩拜单车，送你去芬兰！',
        6: '【抢到就是赚到】葡萄积木圣诞老人、摩拜骑行卡免费送！',
        7: '【足足7000份奖品】葡萄积木圣诞老人免费送，摩拜单车任性骑！',
        // 带主人信息的分享
        8: '【检验真爱的时刻到了】帮我找到积木，赢芬兰机票和摩拜骑行卡！',
        9: '【跟我瓜分圣诞大礼】葡萄积木携手摩拜单车，任性送大礼！',
        10: '【帮我赢芬兰机票】葡萄积木携手摩拜单车，助我去芬兰！',
    },

    sharesubtitle: {
        0: '还有全球限量版葡萄积木，积木警车，365元摩拜骑行卡等你来拿~',

        1: '还有全球限量版葡萄积木，积木警车，365元摩拜骑行卡等你来拿~',
        2: '葡萄积木携手摩拜单车，送芬兰机票，等你赢取~',

        4: '芬兰机票、葡萄积木圣诞老人、365元摩拜骑行卡…上千份礼物任性送，助你告别中奖绝缘体~',
        5: '送你往返机票，去芬兰看极光、偶遇圣诞老人...这样过圣诞节才能刷爆朋友圈！',
        6: '不玩虚的！5000套全球限量版葡萄积木，365元摩拜骑行卡等你来抢，先到先得~',
        7: '芬兰机票、葡萄积木、365元摩拜骑行卡任你抽，想不中奖都难！',

        8: '会是你帮我找到最后一块积木吗？据说参加这个活动的人更容易脱单~',
        9: '芬兰机票、葡萄积木圣诞老人、365元摩拜骑行卡…上千份礼物任性送，一起告别中奖绝缘体~',
        10: '去芬兰看极光、偶遇圣诞老人...这样过圣诞节才能刷爆朋友圈！',
    },

    wish: {
        '1': '圣诞精灵证书',
        '2': '圣诞精灵证书',
        '3': '圣诞精灵证书',
        '4': '圣诞精灵证书',
        '5': '圣诞精灵证书',
        '6': '圣诞精灵证书',
        '7': '圣诞精灵证书圣诞精灵证书',
        '8': '圣诞精灵证书',
        '9': '圣诞精灵证书',
        '10': '圣诞精灵证书',
        '11': '圣诞精灵证书',
        '12': '圣诞精灵证书',
        '13': '圣诞精灵证书',
        '14': '圣诞精灵证书',
        '15': '圣诞精灵证书',
        '16': '圣诞精灵证书',
        '17': '圣诞精灵证书',
        '18': '圣诞精灵证书',
        '19': '圣诞精灵证书',
        '20': '圣诞精灵证书',
        '51': '加油，你是最胖的',
        '52': '福如东海，寿比南山',
        '53': '有汉可撩，有妞可泡',
        '54': '一日不见，胖若两人',
        '55': '新年大吉，膀大腰圆',
        '56': '嫁给爱情，一夜暴富',
        '57': '有人嘘寒问暖，有人买单付款',
        '58': '你胖你可爱，天真惹人爱',
        '59': '现金红包支付宝，都不如你美好',
        '60': '世界那么大，钱包还很鼓',
        '61': '愿你胖瘦自如，颜值超群',
        '62': '祝你年终奖拿到手软，职位赶超老板',
        '63': '天天葛优躺，不做加班狗',
        '64': '不用装戏精，立成大明星',
        '65': '人到中年仍有鲜肉颜',
        '66': '愿偷偷爱着你的人比地球人还多',
        '67': '红包将你砸傻，礼物将你压垮',
        '68': '脱光早成双，幸福万年长',
        '69': '吃嘛嘛香，身体倍儿胖',
        '70': '少吃几口肉，明天维秘你走秀',
        '71': '撩妹技能满点，桃花遍地都是',
        '72': '终有一天，睡到爱豆',
        '73': '永远十八，貌美如花',
        '101': '价值30元葡萄积木联名摩拜骑行卡',
        '102': '价值365元葡萄积木联名摩拜骑行卡',
        '103': '最后一块葡萄积木',
        '104': '葡萄积木《布布百变警车》',
        '105': '芬兰来回机票',
    },
    error: {
        '0': '成功',
        '42700': '参数错误',
        '42701': '签名错误',
        '42702': 'token错误',
        '42703': '用户名或密码错误',
        '42704': '你已经分享过了',
        '42705': '操作失败',
        '42709': '用户不存在',
        '42712': '验证码错误',
        '42713': '用户已经领取过了',
        '42714': '用户已经抽过奖了',
        '42716': '短信服务器异常',
        '42717': '手机号已经绑定过了',
    }
}