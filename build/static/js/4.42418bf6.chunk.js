(this.webpackJsonpMamalift=this.webpackJsonpMamalift||[]).push([[4],{495:function(e,n,t){"use strict";t.r(n),t.d(n,"FacebookLoginWeb",(function(){return f}));var r=t(10),o=t(12),c=t(13),i=t(22),a=t(24),s=t(7),u=t.n(s),f=function(e){Object(i.a)(t,e);var n=Object(a.a)(t);function t(){return Object(o.a)(this,t),n.call(this,{name:"FacebookLogin",platforms:["web"]})}return Object(c.a)(t,[{key:"initialize",value:function(e){var n=this,t={version:"v10.0"};return new Promise((function(r,o){try{return n.loadScript(e.locale).then((function(){FB.init(Object.assign(Object.assign({},t),e)),r()}))}catch(c){o(c)}}))}},{key:"loadScript",value:function(e){if("undefined"===typeof document)return Promise.resolve();if(null===document||void 0===document?void 0:document.getElementById("fb"))return Promise.resolve();var n=document.getElementsByTagName("head")[0],t=document.createElement("script");return new Promise((function(r){t.defer=!0,t.async=!0,t.id="fb",t.onload=function(){r()},t.src="https://connect.facebook.net/".concat(null!==e&&void 0!==e?e:"en_US","/sdk.js"),n.appendChild(t)}))}},{key:"login",value:function(){var e=Object(r.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("FacebookLoginWeb.login",n),e.abrupt("return",new Promise((function(e,t){FB.login((function(n){console.debug("FB.login",n),"connected"===n.status?e({accessToken:{token:n.authResponse.accessToken}}):t({accessToken:{token:null}})}),{scope:n.permissions.join(",")})})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(r.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){FB.logout((function(){return e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getCurrentAccessToken",value:function(){var e=Object(r.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){FB.getLoginStatus((function(t){if("connected"===t.status){var r={accessToken:{applicationId:void 0,declinedPermissions:[],expires:void 0,isExpired:void 0,lastRefresh:void 0,permissions:[],token:t.authResponse.accessToken,userId:t.authResponse.userID}};e(r)}else n({accessToken:{token:null}})}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getProfile",value:function(){var e=Object(r.a)(u.a.mark((function e(n){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.fields.join(","),e.abrupt("return",new Promise((function(e,n){FB.api("/me",{fields:t},(function(t){t.error?n(t.error.message):e(t)}))})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),t}(t(28).c)}}]);
//# sourceMappingURL=4.42418bf6.chunk.js.map