function render(e,t,n){if(console.log(e),e&&0!=e.length){var i=template("assist_tpl",{giftlist:e});$(".help").html(i),$(".help").on("click",".yes",function(){var e=$(this).data("result"),i="./mygift_opened.html?giftid="+e+"&nickname="+t,o="./share.html?master_uid="+n;if(101==e||102==e||104==e){var a=$(this).data("code");setData({mb_code:a}),location.href=i}else 103==e&&(location.href=o)})}}FastClick.attach(document.body),template.helper("dateFormat",function(e){var t="MM/dd hh:mm",n={M:(e=new Date(1e3*e)).getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),q:Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};return t=t.replace(/([yMdhmsqS])+/g,function(t,i){var o=n[i];return void 0!==o?(t.length>1&&(o=(o="0"+o).substr(o.length-2)),o):"y"===i?(e.getFullYear()+"").substr(4-t.length):t})}),template.helper("giftName",function(e){return config.wish[e]}),$(function(){is_weixin()&&checkMyGift(function(e){console.log(e.id),0==e.error_code&&render(e.gift_list,e.master_info.nickname,e.id)})});