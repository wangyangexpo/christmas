function parseQuery(){for(var t={},e=location.search.slice(1).split("&"),r=0;r<e.length;r++){var s=e[r].split("=");t[s[0]]=s[1]}return t}function setData(t){for(var e in t)sessionStorage.setItem(e,JSON.stringify(t[e]))}function getData(t){return JSON.parse(sessionStorage.getItem(t))}