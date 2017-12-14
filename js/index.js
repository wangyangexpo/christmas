// shim requestAnimationFrame
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
})();

if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

FastClick.attach(document.body);

// 需要预加载的图片资源列表
var cacheImage = [
    './images/icon_help.png',
    './images/dark.png',
    './images/moon.png',
    './images/santa_claus_shadow.gif',
    './images/santa_claus_shadow_left.gif',
    './images/santa_claus_normal.gif',
    './images/santa_claus_gift.gif',
    './images/santa_claus_done.png',
    './images/santa_claus_finish.png',
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
    './images/btn/start_btn.png',
    './images/start_logo.png',
    './images/start_name.png',
    './images/ticket.png',
    './images/gesture/gesture.png',
    './images/gesture/gesture.gif',
    './images/pop_1.png',
    './images/pop_2.png',
    './images/findlast/window.png',
    './images/findlast/fenxiang_bg.png',
    './images/btn/btn_next.png',

    './images/opened/bg_light.png',
    './images/opened/card_bg.png',
    './images/opened/jingche.png',
    './images/opened/nianka.png',
    './images/opened/yueka.png',
    './images/share/bg_xmas.png',
    './images/snow/santa_claus_no_hat.png',
    './images/snow/santa_claus_with_hat.png',
    './images/unopen/pic_liwu.png',
    './images/unopen/santa.png',
    './images/share/dialog_pic_jimu.png',
    './images/share/dialog_pic_note.png',

];
// 需要预加载的音频资源列表 id是音频的id 调用soundjs的时候使用的对应id
var cacheAudio = [{
        src: './sound/gift.mp3',
        id: 'gift'
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
];

var c_image_length = cacheImage.length;
var c_audio_length = cacheAudio.length;
var res_total_length = c_image_length + c_audio_length;

var audioDone = 0;

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
        $('#stage,.before').show();
        $('#go').on('touchstart', function() {
            $('#go').off('touchstart');
            $('.before').addClass('disappear');
            createjs.Sound.play('bgm');
            santaClausAnimate2();
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
        $('#stage,.before').show();
        $('#go').on('touchstart', function() {
            $('#go').off('touchstart');
            $('.before').addClass('disappear');
            createjs.Sound.play('bgm');
            santaClausAnimate2();
        })
    }

}

var $santaClaus = $('#santa-claus');

// 圣诞老人剪影动画
function santaClausAnimate2() {
    $santaClaus.addClass('santa-claus-2');
    animate('#santa-claus', 'left', -15, 104, 0.8, function() {
        $santaClaus.removeClass('santa-claus-2');
        furtherStageAnimate();
    });
}

// 圣诞老人二次入场动画 100 ————》 -75
function santaClausAnimate3() {
    $('.before').remove();
    $santaClaus.addClass('santa-claus-3');
    animate('#santa-claus', 'left', 100, 90, 1.2, function() {
        $santaClaus.find('.pop').addClass('show');
        animate('#santa-claus', 'left', 90, 20, 1.2, function() {
            $santaClaus.find('.pop').removeClass('show');
            animate('#santa-claus', 'left', 20, -60, 1.2, function() {
                $santaClaus.removeClass('santa-claus-3');
                santaClausAnimate4();
            })
        })
    });
}

// 圣诞老人三次入场动画
function santaClausAnimate4() {
    $santaClaus.addClass('santa-claus-4');
    animate('#santa-claus', 'left', -120, 20, 2, function() {
        $santaClaus.find('.pop').addClass('show');
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
    var _stage = $('#stage');
    var _gift = $('#gift');
    var _noseen = $('#sky,#moon');

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
            })

            _stage.css({
                'top': stage_top_end + 'vw',
            })
            console.log('droping end');
            _gift.remove();
            _noseen.remove();
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
    //createjs.Sound.play("boom");

    setTimeout(function() {

        var _boom = $('.boom');
        var _mask = $('.snow-mask');
        var _alert = $('.res-window');
        $('.tip-1').addClass('show');
        _mask.show();
        _boom.show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            console.log('ani end');
            _boom.remove();
            _mask.remove();
            $('.hand-1').addClass('gesture');
            // boom消失，绑定擦除积雪效果
            _ground.on('touchend', '.snow', function() {
                createjs.Sound.play("wipe");
                $('.snow').addClass('disappear');
                $('.hand-1').remove();
                $('.tip-1').remove();
                $('.hand-2').show();
                $('.tip-2').addClass('show');
            }).on('touchend', '.touch', function() {
                _ground.off('touchend');
                _block.addClass('disappear');
                _model.css('zIndex', 999).addClass('appear');
                // _alert.css('zIndex', 999).addClass('appear');
                alertAnimate(_alert, 'fadeInLeft', function() {
                    _ground.remove();
                });
                $('.hand-2').remove();
                $('.tip-2').remove();
                _alert.on('touchend', '.btn',  function() {
                    location.href = './html/findlast.html';
                })
            })
        });
        _block.show();
    }, step);

}

// 场景缩小 镜头拉远
function furtherStageAnimate() {
    $('#stage,#moon,#sky').toggleClass('far');
    setTimeout(function() {
        santaClausAnimate3();
    }, 2500);
}

// 动画执行函数 step是以最大的变化属性的step
function animate(ele, attr, start, end, step, callback) {
    end > start ? (step = step) : (step = -step);
    var ani = function() {
        start += step;
        $(ele).css(attr, start.toFixed(2) + 'vw');
        if (Math.abs(start - end) < Math.abs(step)) {
            $(ele).css(attr, end + 'vw');
            callback ? callback() : null;
        } else {
            requestAnimationFrame(ani);
        }
    }
    requestAnimationFrame(ani);
}

function alertAnimate(_alert, css, callback) {
    _alert.css('zIndex', 999).addClass(css + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass(css);
        callback();
    });
}