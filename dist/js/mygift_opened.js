function getQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?decodeURIComponent(n[2]):null}function countDown(e){var t=$(".getcode"),n=setInterval(function(){e?t.text(e-1+"秒"):(t.text("获取验证码"),clearInterval(n)),e--},1e3)}FastClick.attach(document.body);var giftlist={0:{name:"圣诞精灵证书",el:['<img src="../images/zhengshu/zhengshu_','.png" alt="" class="zhengshu">'],pre:"1张",desc:""},104:{name:"葡萄积木警车",el:'<img src="../images/opened/jingche.png" alt="" class="jingche">',pre:"1辆",desc:"获得了葡萄积木《布布百变警车》"},101:{name:"摩拜单车月卡",el:'<img src="../images/opened/yueka.png" alt="" class="yueka">',pre:"1张",desc:"获得了价值30元摩拜&葡萄积木联名骑行卡1张"},102:{name:"摩拜单车年卡",el:'<img src="../images/opened/nianka.png" alt="" class="nianka">',pre:"1张",desc:"获得了价值365元摩拜&葡萄积木联名骑行卡1张"}};$(function(){var e,t=$("#mgmask"),n=getQueryString("nickname")||"",i=getQueryString("giftid")||0,a=getQueryString("isshare")||0,c=getData("mb_code")||"";$(".wx-name").text(n+"，"),i>=0&&i<=20?(e=giftlist[0]).el=e.el[0]+i+e.el[1]:(e=giftlist[i])?0==a&&$(".receive").show():(e=giftlist[0]).el=e.el[0]+"1"+e.el[1];var o=$(e.el);if($(".gift-img").append(o),$(".gift-name").text(e.name),$(".gift-desc").text(e.desc),is_weixin()){var g=config.shareorigin+"html/mygift_opened.html?giftid="+i+"&nickname="+encodeURIComponent(n)+"&isshare=1";wxShare(g,2,e.pre+e.name)}t.on("click",".icon-close",function(){t.find(".bg-rotate,.gift-img>img").addClass("disappear"),setTimeout(function(){t.hide()},1e3)});var r=$(".getcode"),l=$(".phone"),s=$(".code"),m=$(".commit"),d=/^1[0-9]{10}$/;r.on("click",function(){var e=r.text(),t=$.trim(l.val());11==t.length&&d.test(t)?"获取验证码"==e&&(countDown(60),giftGetCode(t)):alert("请输入正确的手机号")}),m.on("click",function(){var e=$.trim(l.val()),t=$.trim(s.val());console.log(e,t),e?t?giftCheckCode(e,t,function(t){0==t.error_code&&(location.href="./mygift_receive.html?giftid="+i+"&mb_code="+c+"&phone="+e+"&nickname="+encodeURIComponent(n))}):alert("请输入验证码！"):alert("请输入手机号！")})});