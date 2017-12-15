FastClick.attach(document.body);

$(function() {

	$(".snow-canvas").snow();

    $('.btn').on('click', function() {
        location.href = './activity.html?t=' + new Date().getTime();
    })
    createjs.Sound.on("fileload", function() {
    	createjs.Sound.play('bgm');
    });
    createjs.Sound.registerSound('../sound/bgm.mp3', 'bgm');
})