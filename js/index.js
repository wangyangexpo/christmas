// shim requestAnimationFrame
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

FastClick.attach(document.body);

// 需要预加载的图片资源列表
var cacheImage = [
    './images/dark.png',
    './images/moon.png',
    './images/santa_claus_shadow.gif',
    './images/santa_claus_shadow_left.gif',
    './images/santa_claus_normal.gif',
    './images/santa_claus_gift.gif',
    './images/santa_claus_done.png',
    './images/gift.png',
    './images/bush.png',
    './images/stage_nothing.jpeg',
    './images/star_big.png',
    './images/star_small.png',
    './images/snow/snow_01.png',
    './images/snow/snow_02.png',
    './images/snow/snow_03.png',
    './images/boom/boom_04.png',
    './images/block_1.png',
    './images/block_2.png',
    './images/block_all.png',
    './images/block_4.png',
    './images/start_btn.png',
    './images/start_logo.png',
    './images/start_name.png',
    './images/ticket.png',
    './images/santa_claus_finish.png',
    './images/gesture/gesture.png',
    './images/gesture/gesture.gif',

];
// 需要预加载的音频资源列表 id是音频的id 调用soundjs的时候使用的对应id
var cacheAudio = [{
        src: './sound/gift.mp3',
        id: 'gift'
    },
    {
        src: './sound/boom.wav',
        id: 'boom'
    },
    {
        src: './sound/wipe.mp3',
        id: 'wipe'
    },
    {
        src: './sound/bgm.mp3',
        id: 'bgm'
    },
    {
        src: './sound/laugh.mp3',
        id: 'laugh'
    },
    // {
    //     src: './sound/bell.mp3',
    //     id: 'bell'
    // },
    {
        src: './sound/wind.mp3',
        id: 'wind'
    },
    {
        src: './sound/combine.mp3',
        id: 'combine'
    }
];

var c_image_length = cacheImage.length;
var c_audio_length = cacheAudio.length;
var res_total_length = c_image_length + c_audio_length;

var audioDone = 0;

var belling = null;

var loadingani = loading();

$(function() {

    if (is_weixin() || is_mobike()) {
        // 先加载图片列表
        preloadImages(cacheImage, function() {
            // 加载完毕加载音频列表
            preloadAudio(cacheAudio);
        }, res_total_length);
    } else {
        location.replace('./html/notfound.html');
    }

})

function loading() {
    var bgp = 0;
    var _loading = $('#loading_pic');
    return setInterval(function() {
        bgp %= 6;
        _loading.css('backgroundPosition', -bgp * 40 + 'vw');
        bgp++;
    }, 100)
}

// 图片预加载
function preloadImages(list, callback, total) {
    var len = list.length;
    var num = 0;
    for (var i = 0; i < len; i++) {
        var cacheImage = document.createElement('img');
        cacheImage.src = list[i];
        cacheImage.onload = function() {
            this.onload = null;
            num++;
            $('#load_percent').text((num / total * 100).toFixed(2));
            if (num >= len) {
                callback();
            }
        };

    }
}

// 音频预加载
function loadHandler(event) {

    audioDone++;

    $('#load_percent').text(((c_image_length + audioDone) / res_total_length * 100).toFixed(2));

    if (audioDone >= c_audio_length) {
        clearInterval(loadingani);
        $('#loading').remove();
        $('#stage,#gotext,#logo').show();
        $('#go').on('touchstart', function() {
            $('#go').off('touchstart');
            $('.before').addClass('disappear');
            var instance = createjs.Sound.play('bgm');
            santaClausAnimate1();
        })
    }

}

function preloadAudio(list) {

    createjs.Sound.on("fileload", loadHandler);
    var len = list.length;
    if (len) {
        for (var i = 0; i < len; i++) {
            createjs.Sound.registerSound(list[i].src, list[i].id);
        }
    } else {
        clearInterval(loadingani);
        $('#loading').remove();
        $('#stage,#gotext,#logo').show();
        $(document).on('touchstart', function() {
            $(document).off('touchstart');
            var instance = createjs.Sound.play('bgm');
            santaClausAnimate1();
        })
    }

}

var $santaClaus = $('#santa-claus');

// 圣诞老人剪影动画0
function santaClausAnimate1() {
    //belling = createjs.Sound.play('bell');
    //belling.loop = Infinity;
    $santaClaus.addClass('santa-claus-1');
    animate('#santa-claus', 'left', 100, -15, 0.8, function() {
        $santaClaus.removeClass('santa-claus-1');
        santaClausAnimate2();
    });
}

// 圣诞老人剪影动画
function santaClausAnimate2() {
    $santaClaus.addClass('santa-claus-2');
    animate('#santa-claus', 'left', -15, 104, 0.8, function() {
        $santaClaus.removeClass('santa-claus-2');
        furtherStageAnimate();
    });
}

// 圣诞老人二次入场动画
function santaClausAnimate3() {

    $santaClaus.addClass('santa-claus-3');
    animate('#santa-claus', 'left', 100, -75, 1.5, function() {
        $santaClaus.removeClass('santa-claus-3');
        //belling.stop();
        santaClausAnimate4();
    });
}

// 圣诞老人三次入场动画
function santaClausAnimate4() {
    $santaClaus.addClass('santa-claus-4');
    animate('#santa-claus', 'left', -120, 20, 2.5, function() {
        createjs.Sound.play("laugh");
        setTimeout(function() {
            $santaClaus.removeClass('santa-claus-4');
            $santaClaus.addClass('santa-claus-5');
            giftAnimate();
        }, 1000);
    });
}

// 扔礼物动画
function giftAnimate() {
    var _gift = $('#gift');
    _gift.show();

    var voice = createjs.Sound.play("gift");

    // 基准缩放参数
    var g_w_step = 0.8;
    var gift_width_from = 13;
    var gift_width_end = 32;
    var gift_height_from = 14.9;
    var gift_height_end = 36.6;
    var gift_left_from = 29;
    var gift_left_end = 34;
    var gift_top_from = 150;
    var gift_top_end = 110;

    var base_cross = Math.abs(gift_width_from - gift_width_end);
    var base_step = Math.abs(g_w_step);

    var g_l_step = (gift_left_end - gift_left_from) * base_step / base_cross;
    var g_t_step = (gift_top_end - gift_top_from) * base_step / base_cross;
    var g_h_step = (gift_height_end - gift_height_from) * base_step / base_cross;

    var closing = function() {
        gift_width_from += g_w_step;
        gift_left_from += g_l_step;
        gift_top_from += g_t_step;
        gift_height_from += g_h_step;

        _gift.css({
            'width': gift_width_from + 'vw',
            'height': gift_height_from + 'vw',
            'top': gift_top_from + 'vw',
            'left': gift_left_from + 'vw'
        })

        if (Math.abs(gift_width_end - gift_width_from) < Math.abs(g_w_step)) {
            _gift.css({
                'width': gift_width_end + 'vw',
                'height': gift_height_end + 'vw',
                'top': gift_top_end + 'vw',
                'left': gift_left_end + 'vw'
            })
            console.log('gift end');
            giftDroping();
        } else {
            requestAnimationFrame(closing);
        }
    }
    requestAnimationFrame(closing);

}

// 礼物下落动画
function giftDroping() {
    var _stage = $('#stage').css('willChange', 'top');
    var _gift = $('#gift').css('willChange', 'top,left,width');

    var s_t_step = -3;
    var stage_top_from = 0;
    var stage_top_end = -128;
    var gift_top_from = 110;
    var gift_top_end = 290;
    var gift_left_from = 34;
    var gift_left_end = 26;
    var gift_width_from = 32;
    var gift_width_end = 48;
    var gift_height_from = 36.6;
    var gift_height_end = 54.9;

    var base_cross = Math.abs(stage_top_from - stage_top_end);
    var base_step = Math.abs(s_t_step);

    var g_t_step = (gift_top_end - gift_top_from) * base_step / base_cross;
    var g_w_step = (gift_width_end - gift_width_from) * base_step / base_cross;
    var g_l_step = (gift_left_end - gift_left_from) * base_step / base_cross;
    var g_h_step = (gift_height_end - gift_height_from) * base_step / base_cross;

    var droping = function() {
        stage_top_from += s_t_step;
        gift_top_from += g_t_step;
        gift_width_from += g_w_step;
        gift_left_from += g_l_step;
        gift_height_from += g_h_step;

        _gift.css({
            'top': gift_top_from + 'vw',
            'width': gift_width_from + 'vw',
            'height': gift_height_from + 'vw',
            'left': gift_left_from + 'vw'
        })

        _stage.css({
            'top': stage_top_from + 'vw'
        })

        if (Math.abs(stage_top_end - stage_top_from) < Math.abs(s_t_step)) {
            _gift.css({
                'top': gift_top_end + 'vw',
                'width': gift_width_end + 'vw',
                'height': gift_height_end + 'vw',
                'left': gift_left_end + 'vw',
                'willChange': 'auto',
            })

            _stage.css({
                'top': stage_top_end + 'vw',
                'willChange': 'auto',
            })
            console.log('droping end');
            _gift.hide();

            snowBoomAnimate();
        } else {
            requestAnimationFrame(droping);
        }
    }
    requestAnimationFrame(droping);
}

// 雪花炸开动画
function snowBoomAnimate() {
    var step = 100;
    var _block = $('.block');
    var _ground = $('.ground');
    var _model = $('#model');
    createjs.Sound.play("boom");

    setTimeout(function() {
        $('#boom').show();
        _block.show();
    }, step);

    setTimeout(function() {
        $('#boom').remove();
        $('.hand-1').addClass('gesture');
        // boom消失，绑定擦除积雪效果
        _ground.on('touchend', '.snow', function() {
            createjs.Sound.play("wipe");
            $(this).off('touchend').remove();
            if ($('.snow').length == 0) {
                $('.hand-1').remove();
                ticketAnimate();
            }
        }).on('touchend', '.touch', function() {
            _ground.off('touchend');
            _block.addClass('disappear');
            _model.addClass('appear');
            $('.hand-2').remove();
            _model.css('zIndex', 999);
            createjs.Sound.play("combine");
            _model.on('touchend', function() {
                location.href = './html/findlast.html';
            })
        })
    }, 5500);
}

// 场景缩小 镜头拉远
function furtherStageAnimate() {
    $('#stage,#moon,#sky').toggleClass('far');
    setTimeout(function() {
        santaClausAnimate3();
    }, 2500);
}

// 机票飞过屏幕的动画
function ticketAnimate() {
    var _ticket = $('#ticket').css('willChange', 'top,left');
    var t_t_step = 1.5;
    var ticket_top_from = 180;
    var ticket_top_end = 270;
    var ticket_left_from = 104;
    var ticket_left_end = 0;

    var base_cross = Math.abs(ticket_top_end - ticket_top_from);
    var base_step = Math.abs(t_t_step);

    var t_l_step = (ticket_left_end - ticket_left_from) * base_step / base_cross;
    createjs.Sound.play("wind");

    var flyIn = function() {
        ticket_top_from += t_t_step;
        ticket_left_from += t_l_step;

        _ticket.css({
            'top': ticket_top_from + 'vw',
            'left': ticket_left_from + 'vw'
        })

        if (Math.abs(ticket_top_end - ticket_top_from) < Math.abs(t_t_step)) {
            _ticket.css({
                'top': ticket_top_end + 'vw',
                'left': ticket_left_end + 'vw'
            })
            t_t_step = 2;
            ticket_top_from = ticket_top_end;
            ticket_top_end = 360;
            ticket_left_from = ticket_left_end;
            ticket_left_end = -104;
            base_cross = Math.abs(ticket_top_end - ticket_top_from);
            base_step = Math.abs(t_t_step);

            t_l_step = (ticket_left_end - ticket_left_from) * base_step / base_cross;
            setTimeout(function() {
                requestAnimationFrame(flyOut);
            }, 2000);
        } else {
            requestAnimationFrame(flyIn);
        }
    }

    var flyOut = function() {
        ticket_top_from += t_t_step;
        ticket_left_from += t_l_step;

        _ticket.css({
            'top': ticket_top_from + 'vw',
            'left': ticket_left_from + 'vw'
        })

        if (Math.abs(ticket_top_end - ticket_top_from) < Math.abs(t_t_step)) {
            _ticket.css({
                'top': ticket_top_end + 'vw',
                'left': ticket_left_end + 'vw',
                'willChange': 'auto',
            })
            console.log('ticket fly done');
            $('.hand-2').show();
        } else {
            requestAnimationFrame(flyOut);
        }

    }

    requestAnimationFrame(flyIn);

}

// 动画执行函数 step是以最大的变化属性的step
function animate(ele, attr, start, end, step, callback) {
    end > start ? (step = step) : (step = -step);
    $(ele).css('willChange', attr);
    var ani = function() {
        start += step;
        $(ele).css(attr, start.toFixed(2) + 'vw');
        if (Math.abs(start - end) < Math.abs(step)) {
            $(ele).css(attr, end + 'vw');
            $(ele).css('willChange', 'auto');
            callback ? callback() : null;
        } else {
            requestAnimationFrame(ani);
        }
    }
    requestAnimationFrame(ani);
}