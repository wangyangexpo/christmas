function getQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),i=window.location.search.substr(1).match(t);return null!=i?decodeURIComponent(i[2]):null}function setData(e){for(var t in e)localStorage.setItem(t,JSON.stringify(e[t]))}function getData(e){return JSON.parse(localStorage.getItem(e))}function is_weixin(){return 1==config.is_test?config.is_weixin:"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)}function is_mobike(){if(config.is_test)return config.is_mobike;var e=window.navigator.userAgent.toLowerCase();return/mobike/.test(e)}function mobikeShare(e,t){is_mobike()&&window.Mobike.menu("menu",{title:"分享"},function(){window.Mobike.share("share",{title:config.sharetitle[t],content:config.sharesubtitle[t],url:e,img:config.shareicon,mask:"3",type:"12"})})}function add_auth(e){var t=getData("uid"),i=getData("token");return e.uid=t,e.token=i,e}function ajaxGet(e,t,i){config.is_test?0==test_res.error_code?i&&i(test_res):console.log(config.error[test_res.error_code]||"未知错误"):(t.t=(new Date).getTime(),$.ajax({type:"get",xhrFields:{withCredentials:!0},data:t,url:e,success:function(e){0==e.error_code?(console.log("success"),i&&i(e)):"42702"==e.error_code?authorization():(console.log(e.error_code),alert(config.error[e.error_code]))}}))}function authorization(){is_weixin()?location.href=config.authurl+"?t="+(new Date).getTime():console.log("not in wx!")}function joinGameByPhone(e,t){var i=config.host+config.joinbyphone;console.log(e),ajaxGet(i,{mobile:e},t)}function checkJoinCode(e,t,i){ajaxGet(config.host+config.joincheck,{mobile:e,code:t},i)}function joinGameByWX(e){var t=config.host+config.joinbyweixin;config.is_auth&&ajaxGet(t,{},e)}function getAssistList(e,t){var i=config.host+config.prizelist;config.is_auth&&ajaxGet(i,{master_uid:e},t)}function giftGetCode(e,t){ajaxGet(config.host+config.prizebind,{mobile:e},t)}function giftCheckCode(e,t,i){ajaxGet(config.host+config.bindcheck,{mobile:e,code:t},i)}function checkMyGift(e){if(config.is_test)e(test_mygift);else{var t=config.host+config.giftlist;config.is_auth&&ajaxGet(t,{},e)}}function openGift(e,t,i){var o=config.host+config.prize;config.is_auth&&ajaxGet(o,{master_uid:e,position:t},i)}function getCookie(e){var t,i=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(i))?unescape(t[2]):null}function wxShare(e,t,i){var o=location.href.split("#")[0],n=config.sharetitle[t],r=config.sharesubtitle[t];i&&(n=n.replace("xxx",i));var s=config.shareicon,a=e;if(config.is_test)return console.log(n),console.log(r),console.log(s),void console.log(a);$.ajax({data:{url:o,t:(new Date).getTime()},type:"get",url:config.host+config.wxsdk,success:function(e){console.log(e),0==e.error_code?wx.config({debug:!1,appId:e.appid,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:e.jsApiList}):alert(e.error_msg)}}),wx.ready(function(){wx.onMenuShareTimeline({title:n,link:a,imgUrl:s,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:n,desc:r,link:a,imgUrl:s,success:function(){},cancel:function(){}})}),wx.error(function(e){console.log(e)})}var test_res={error_code:0,error_msg:"",master_info:{nickname:"wangyangexpo",headimgurl:"../images/test_avatar.jpeg"},custom_prize_status:1,custom_prize_info:{position:1,result:56,time:151928323},master_prize_status:1,master_prize_info:{result:101},prize_list:[{headimgurl:"../images/test_avatar.jpeg",nickname:"胖大海",result:1,time:151823123},{headimgurl:"../images/test_avatar.jpeg",nickname:"小星星",result:103,time:151863124}],master_result:51,custom_result:1,nickname:"xixihaha",custom_code:"test-8888999966664321",id:"WMYLWYXNXYXRDYY"},test_mygift={error_code:0,error_msg:"",master_info:{headimgurl:"xxx.jpg",nickname:"王阳",id:14,status:0},prize_list:[{result:2,time:15812341234,code:""},{result:101,time:15812341234,code:"test-8888999966664321"}]};if(is_weixin()){var uid=getQueryString("uid"),token=getQueryString("token");uid&&token?(config.is_auth=!0,setData({uid:uid,token:token}),wxShare(config.defaultshareurl,0)):getData("uid")&&getData("token")?(config.is_auth=!0,wxShare(config.defaultshareurl,0)):authorization()}else is_mobike()&&mobikeShare(config.defaultshareurl,0);