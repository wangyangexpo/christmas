function loading(){var a=0,t=$("#loading_pic");return setInterval(function(){a%=6,t.css("backgroundPosition",40*-a+"vw"),a++},100)}function preloadImages(a,t,n){for(var e=a.length,s=0,o=0;o<e;o++){var i=document.createElement("img");i.src=a[o],i.onload=function(){this.onload=null,s++,$("#load_percent").text((s/n*100).toFixed(2)),s>=e&&t()}}}function loadHandler(a){audioDone++,$("#load_percent").text(((c_image_length+audioDone)/res_total_length*100).toFixed(2)),audioDone>=c_audio_length&&(clearInterval(loadingani),$("#loading").remove(),$("#stage,#gotext,#logo").show(),$("#go").on("touchstart",function(){$("#go").off("touchstart"),$(".before").addClass("disappear");createjs.Sound.play("bgm");santaClausAnimate1()}))}function preloadAudio(a){createjs.Sound.on("fileload",loadHandler);var t=a.length;if(t)for(var n=0;n<t;n++)createjs.Sound.registerSound(a[n].src,a[n].id);else clearInterval(loadingani),$("#loading").remove(),$("#stage,#gotext,#logo").show(),$(document).on("touchstart",function(){$(document).off("touchstart");createjs.Sound.play("bgm");santaClausAnimate1()})}function santaClausAnimate1(){$santaClaus.addClass("santa-claus-1"),animate("#santa-claus","left",100,-15,.8,function(){$santaClaus.removeClass("santa-claus-1"),santaClausAnimate2()})}function santaClausAnimate2(){$santaClaus.addClass("santa-claus-2"),animate("#santa-claus","left",-15,104,.8,function(){$santaClaus.removeClass("santa-claus-2"),furtherStageAnimate()})}function santaClausAnimate3(){$santaClaus.addClass("santa-claus-3"),animate("#santa-claus","left",100,-75,1.5,function(){$santaClaus.removeClass("santa-claus-3"),santaClausAnimate4()})}function santaClausAnimate4(){$santaClaus.addClass("santa-claus-4"),animate("#santa-claus","left",-120,20,2.5,function(){createjs.Sound.play("laugh"),setTimeout(function(){$santaClaus.removeClass("santa-claus-4"),$santaClaus.addClass("santa-claus-5"),giftAnimate()},1e3)})}function giftAnimate(){var a=$("#gift");a.show();createjs.Sound.play("gift");var t=13,n=14.9,e=29,s=150,o=Math.abs(t-32),i=Math.abs(.8),l=(34-e)*i/o,u=(110-s)*i/o,c=(36.6-n)*i/o,g=function(){t+=.8,e+=l,s+=u,n+=c,a.css({width:t+"vw",height:n+"vw",top:s+"vw",left:e+"vw"}),Math.abs(32-t)<Math.abs(.8)?(a.css({width:"32vw",height:"36.6vw",top:"110vw",left:"34vw"}),console.log("gift end"),giftDroping()):requestAnimationFrame(g)};requestAnimationFrame(g)}function giftDroping(){var a=$("#stage").css("willChange","top"),t=$("#gift").css("willChange","top,left,width"),n=0,e=110,s=34,o=32,i=36.6,l=Math.abs(n- -128),u=Math.abs(-3),c=(290-e)*u/l,g=(48-o)*u/l,m=(26-s)*u/l,d=(54.9-i)*u/l,r=function(){n+=-3,e+=c,o+=g,s+=m,i+=d,t.css({top:e+"vw",width:o+"vw",height:i+"vw",left:s+"vw"}),a.css({top:n+"vw"}),Math.abs(-128-n)<Math.abs(-3)?(t.css({top:"290vw",width:"48vw",height:"54.9vw",left:"26vw",willChange:"auto"}),a.css({top:"-128vw",willChange:"auto"}),console.log("droping end"),t.hide(),snowBoomAnimate()):requestAnimationFrame(r)};requestAnimationFrame(r)}function snowBoomAnimate(){var a=$(".block"),t=$(".ground"),n=$("#model");createjs.Sound.play("boom"),setTimeout(function(){$("#boom").show(),a.show()},100),setTimeout(function(){$("#boom").remove(),$(".hand-1").addClass("gesture"),t.on("touchend",".snow",function(){createjs.Sound.play("wipe"),$(this).off("touchend").remove(),0==$(".snow").length&&($(".hand-1").remove(),ticketAnimate())}).on("touchend",".touch",function(){t.off("touchend"),a.addClass("disappear"),n.addClass("appear"),$(".hand-2").remove(),n.css("zIndex",999),createjs.Sound.play("combine"),n.on("touchend",function(){location.href="./html/findlast.html"})})},5500)}function furtherStageAnimate(){$("#stage,#moon,#sky").toggleClass("far"),setTimeout(function(){santaClausAnimate3()},2500)}function ticketAnimate(){var a=$("#ticket").css("willChange","top,left"),t=1.5,n=180,e=270,s=104,o=0,i=Math.abs(e-n),l=Math.abs(t),u=(o-s)*l/i;createjs.Sound.play("wind");var c=function(){n+=t,s+=u,a.css({top:n+"vw",left:s+"vw"}),Math.abs(e-n)<Math.abs(t)?(a.css({top:e+"vw",left:o+"vw"}),t=2,n=e,e=360,s=o,o=-104,i=Math.abs(e-n),l=Math.abs(t),u=(o-s)*l/i,setTimeout(function(){requestAnimationFrame(g)},2e3)):requestAnimationFrame(c)},g=function(){n+=t,s+=u,a.css({top:n+"vw",left:s+"vw"}),Math.abs(e-n)<Math.abs(t)?(a.css({top:e+"vw",left:o+"vw",willChange:"auto"}),console.log("ticket fly done"),$(".hand-2").show()):requestAnimationFrame(g)};requestAnimationFrame(c)}function animate(a,t,n,e,s,o){s=e>n?s:-s,$(a).css("willChange",t);var i=function(){n+=s,$(a).css(t,n.toFixed(2)+"vw"),Math.abs(n-e)<Math.abs(s)?($(a).css(t,e+"vw"),$(a).css("willChange","auto"),o&&o()):requestAnimationFrame(i)};requestAnimationFrame(i)}window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)},FastClick.attach(document.body);var cacheImage=["./images/dark.png","./images/moon.png","./images/santa_claus_shadow.gif","./images/santa_claus_shadow_left.gif","./images/santa_claus_normal.gif","./images/santa_claus_gift.gif","./images/santa_claus_done.png","./images/gift.png","./images/bush.png","./images/stage_nothing.jpeg","./images/star_big.png","./images/star_small.png","./images/snow/snow_01.png","./images/snow/snow_02.png","./images/snow/snow_03.png","./images/boom/boom_04.png","./images/block_1.png","./images/block_2.png","./images/block_all.png","./images/block_4.png","./images/start_btn.png","./images/start_logo.png","./images/start_name.png","./images/ticket.png","./images/santa_claus_finish.png","./images/gesture/gesture.png","./images/gesture/gesture.gif"],cacheAudio=[{src:"./sound/gift.mp3",id:"gift"},{src:"./sound/boom.wav",id:"boom"},{src:"./sound/wipe.mp3",id:"wipe"},{src:"./sound/bgm.mp3",id:"bgm"},{src:"./sound/laugh.mp3",id:"laugh"},{src:"./sound/wind.mp3",id:"wind"},{src:"./sound/combine.mp3",id:"combine"}],c_image_length=cacheImage.length,c_audio_length=cacheAudio.length,res_total_length=c_image_length+c_audio_length,audioDone=0,belling=null,loadingani=loading();$(function(){is_weixin()||is_mobike()?preloadImages(cacheImage,function(){preloadAudio(cacheAudio)},res_total_length):location.replace("./html/notfound.html")});var $santaClaus=$("#santa-claus");