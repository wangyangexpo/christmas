$(function() {

    preLoadImages(needCache, function() {
        $('#stage').show();
        santaClausAnimate0();
    });

})

var cache = [];
var needCache = [
    './images/dark.png',
    './images/light.png',
    './images/moon.png',
    './images/santa_claus_shadow.gif',
    './images/santa_claus_2.gif',
    './images/santa_claus_3.gif',
    './images/santa_claus_5.png',
    './images/gift.png',
    './images/bush.png',
    './images/stage_nothing.png',
    './images/star_big.png',
    './images/star_small.png',
    './images/snow/01.png',
    './images/snow/02.png',
    './images/snow/03.png',
    './images/boom/boom_01.png',
    './images/boom/boom_02.png',
    './images/boom/boom_03.png',
    './images/boom/boom_04.png',
    './images/block_1.png',
    './images/block_2.png',
    './images/block_ground.png',
    './images/block_4.png',

];

// shim requestAnimationFrame
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// 图片预加载
function preLoadImages(list, callback) {
    var len = list.length;
    var num = 0;
    for (var i = 0; i < len; i++) {
        var cacheImage = document.createElement('img');
        cacheImage.src = list[i];
        cacheImage.onload = function() {
            this.onload = null;
            num += 1;
            if (num == len) {
                $('#loading').hide();
                callback();
            }
            $('#load_percent').text((num / len * 100).toFixed(2));

        };
        cache.push(cacheImage);
    }
}

// 动画执行函数 step是以最大的变化属性的step
function animate(ele, attr, start, end, step, callback) {
    end > start ? (step = step) : (step = -step);
    var ani = function() {
        start += step;
        $(ele).css(attr, start + 'vw');
        if (Math.abs(start - end) < Math.abs(step)) {
            $(ele).css(attr, end + 'vw');
            callback ? callback() : null;
        } else {
            requestAnimationFrame(ani);
        }
    }
    requestAnimationFrame(ani);
}

// 圣诞老人剪影动画0
function santaClausAnimate0() {
    animate('#santa_claus_0', 'right', -15, 100, 0.5, function() {
        console.log('santa_claus animation end');
        $('#santa_claus_0').remove();
        santaClausAnimate1();
    });
}

// 圣诞老人剪影动画
function santaClausAnimate1() {
    animate('#santa_claus', 'left', -20, 100, 0.8, function() {
        console.log('santa_claus animation end');
        $('#santa_claus').remove();
        furtherStageAnimate();
    });
}

// 圣诞老人二次入场动画
function santaClausAnimate2() {
    animate('#santa_claus_2', 'left', 100, -60, 1, function() {
        console.log('santa_claus_2 animation end');
        $('#santa_claus_2').remove();
        santaClausAnimate3();
    });
}

// 圣诞老人三次入场动画
function santaClausAnimate3() {
    animate('#santa_claus_3', 'left', -120, 20, 2, function() {
        console.log('santa_claus_3 animation end');
        setTimeout(function() {
            $('#santa_claus_3').remove();
            giftAnimate();
        }, 1000);
    });
}

// 扔礼物动画
function giftAnimate() {
    $('#santa_claus_5').show();
    var _gift = $('#gift');
    _gift.show();

    // 基准缩放参数
    var g_w_step = 0.8;
    var gift_width_from = 13;
    var gift_width_end = 32;
    var gift_left_from = 24;
    var gift_left_end = 34;
    var gift_top_from = 67;
    var gift_top_end = 26;

    var base_cross = Math.abs(gift_width_from - gift_width_end);
    var base_step = Math.abs(g_w_step);

    var g_l_step = (gift_left_end - gift_left_from) * base_step / base_cross;
    var g_t_step = (gift_top_end - gift_top_from) * base_step / base_cross;

    var closing = function() {
        gift_width_from += g_w_step;
        gift_left_from += g_l_step;
        gift_top_from += g_t_step;

        _gift.css({
            'width': gift_width_from + 'vw',
            'top': gift_top_from + 'vw',
            'left': gift_left_from + 'vw'
        })

        if (Math.abs(gift_width_end - gift_width_from) < Math.abs(g_w_step)) {
            _gift.css({
                'width': gift_width_end + 'vw',
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
    //var _block = $('.block');

    var s_t_step = -2;
    var stage_top_from = 0;
    var stage_top_end = -128;
    var gift_top_from = 26;
    var gift_top_end = 212;
    var gift_left_from = 34;
    var gift_left_end = 26;
    var gift_width_from = 32;
    var gift_width_end = 48;

    var base_cross = Math.abs(stage_top_from - stage_top_end);
    var base_step = Math.abs(s_t_step);

    var g_t_step = (gift_top_end - gift_top_from) * base_step / base_cross;
    var g_w_step = (gift_width_end - gift_width_from) * base_step / base_cross;
    var g_l_step = (gift_left_end - gift_left_from) * base_step / base_cross;

    var droping = function() {
        stage_top_from += s_t_step;
        gift_top_from += g_t_step;
        gift_width_from += g_w_step;
        gift_left_from += g_l_step;

        _gift.css({
            'top': gift_top_from + 'vw',
            'width': gift_width_from + 'vw',
            'left': gift_left_from + 'vw'
        })

        _stage.css({
            'top': stage_top_from + 'vw'
        })

        if (Math.abs(stage_top_end - stage_top_from) < Math.abs(s_t_step)) {
            _gift.css({
                'top': gift_top_end + 'vw',
                'width': gift_width_end + 'vw',
                'left': gift_left_end + 'vw'
            })

            _stage.css({
                'top': stage_top_end + 'vw'
            })
            console.log('droping end');
            _gift.hide();
            //_block.show();
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

    setTimeout(function() {
        $('.boom_4').show();
        _block.show();
    }, step);

    setTimeout(function() {
        $('.boom').remove();
        // boom消失，绑定擦除积雪效果
        $('.snow').on('touchend', '.cover_snow', function() {
	        $(this).remove();
	    })
    }, 5500);
}

// 场景缩小 镜头拉远
function furtherStageAnimate() {
    // 背景缩放
    var bg_step = -0.7;
    var stage_bg_from = 160;
    var stage_bg_end = 100;
    // 月亮缩放
    var moon_width_from = 90;
    var moon_width_end = 24;
    var moon_top_from = 20;
    var moon_top_end = 8;
    var moon_right_from = 5;
    var moon_right_end = 24;
    // 天空（星星和北极光）缩放
    var sky_width_from = 160;
    var sky_width_end = 100;
    var sky_height_from = 212;
    var sky_height_end = 132.5;
    var sky_left_from = -30;
    var sky_left_end = 0;

    // 灌木丛缩放
    var bush_width_from = 87;
    var bush_width_end = 54.4;
    var bush_height_from = 189;
    var bush_height_end = 118.2;
    var bush_right_from = -30;
    var bush_right_end = 0;
    var bush_top_from = 206;
    var bush_top_end = 108;

    // snow
    var snow_top_from = 255;
    var snow_top_end = 142;
    var snow_left_from = -30;
    var snow_left_end = 0;

    // 基准缩放参数
    var base_cross = Math.abs(stage_bg_from - stage_bg_end);
    var base_step = Math.abs(bg_step);

    var m_w_step = (moon_width_end - moon_width_from) * base_step / base_cross;
    var m_t_step = (moon_top_end - moon_top_from) * base_step / base_cross;
    var m_r_step = (moon_right_end - moon_right_from) * base_step / base_cross;
    var s_w_step = (sky_width_end - sky_width_from) * base_step / base_cross;
    var s_h_step = (sky_height_end - sky_height_from) * base_step / base_cross;
    var s_l_step = (sky_left_end - sky_left_from) * base_step / base_cross;

    var b_w_step = (bush_width_end - bush_width_from) * base_step / base_cross;
    var b_h_step = (bush_height_end - bush_height_from) * base_step / base_cross;
    var b_r_step = (bush_right_end - bush_right_from) * base_step / base_cross;
    var b_t_step = (bush_top_end - bush_top_from) * base_step / base_cross;
    var snow_t_step = (snow_top_end - snow_top_from) * base_step / base_cross;
    var snow_l_step = (snow_left_end - snow_left_from) * base_step / base_cross;

    var _stage = $('#stage');
    var _moon = $('#moon');
    var _sky = $('#sky');
    var _bush = $('#bush');
    var _snow = $('#snow');

    var ani = function() {
        stage_bg_from += bg_step;

        moon_width_from += m_w_step;
        moon_top_from += m_t_step;
        moon_right_from += m_r_step;
        sky_width_from += s_w_step;
        sky_height_from += s_h_step;
        sky_left_from += s_l_step;

        bush_width_from += b_w_step;
        bush_height_from += b_h_step;
        bush_right_from += b_r_step;
        bush_top_from += b_t_step;

        snow_top_from += snow_t_step;
        snow_left_from += snow_l_step;

        _stage.css({
            'backgroundSize': stage_bg_from + 'vw'
        });
        _moon.css({
            'width': moon_width_from + 'vw',
            'top': moon_top_from + 'vw',
            'right': moon_right_from + 'vw'
        });
        _sky.css({
            'width': sky_width_from + 'vw',
            'height': sky_height_from + 'vw'
        });
        _sky.css('left', sky_left_from + 'vw');

        _bush.css({
            'width': bush_width_from + 'vw',
            'height': bush_height_from + 'vw',
            'top': bush_top_from + 'vw',
            'right': bush_right_from + 'vw'
        })

        _snow.css({
            'top': snow_top_from + 'vw',
            'left': snow_left_from + 'vw'
        })

        if (Math.abs(stage_bg_end - stage_bg_from) < Math.abs(bg_step)) {
            _stage.css({
                'backgroundSize': stage_bg_end + 'vw'
            });
            _moon.css({
                'width': moon_width_end + 'vw',
                'top': moon_top_end + 'vw',
                'right': moon_right_end + 'vw'
            });
            _sky.css({
                'width': sky_width_end + 'vw',
                'height': sky_height_end + 'vw'
            });
            _sky.css('left', sky_left_end + 'vw');
            _sky.find('.river').show();

            _bush.css({
                'width': bush_width_end + 'vw',
                'height': bush_height_end + 'vw',
                'top': bush_top_end + 'vw',
                'right': bush_right_end + 'vw'
            })

            _snow.css({
                'left': snow_left_end + 'vw',
                'top': snow_top_end + 'vw'
            })

            setTimeout(santaClausAnimate2, 500);
        } else {
            requestAnimationFrame(ani);
        }
    }
    requestAnimationFrame(ani);
}