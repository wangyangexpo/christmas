function get_params(a){for(var r in baseParams)baseParams.hasOwnProperty(r)&&(a[r]=baseParams[r]);return a}function initScroll(a,r,c){c&&(c.tap=!0,c.click=!0),setTimeout(function(){main_scroll=new IScroll("#scroll-container",c||{click:!0,tap:!0}),r&&r()},a||100)}var baseUrl="",baseParams={},main_scroll,FastClick;FastClick&&FastClick.attach(document.body);