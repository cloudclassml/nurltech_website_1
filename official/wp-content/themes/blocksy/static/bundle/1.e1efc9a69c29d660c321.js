(window.blocksyJsonP=window.blocksyJsonP||[]).push([[1],{127:function(t,e,n){"use strict";n.r(e),n.d(e,"mount",(function(){return y}));var r=n(0),o=n(1),c=n(25),a=n.n(c);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var a,i=t[Symbol.iterator]();!(r=(a=i.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==i.return||i.return()}finally{if(o)throw c}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var s=function(t){var e=t.initialStatus,n=t.url,c=t.pluginUrl,l=t.pluginLink,s=i(Object(r.useState)("installed"),2),u=s[0],b=s[1],y=i(Object(r.useState)(!1),2),m=y[0],d=y[1],f=Object(r.useRef)(null);return Object(r.useEffect)((function(){b(e)}),[]),Object(r.createElement)("div",{className:"ct-blocksy-plugin-inner",ref:f},Object(r.createElement)("button",{onClick:function(){f.current.closest(".notice-blocksy-plugin").parentNode.removeChild(f.current.closest(".notice-blocksy-plugin")),a.a.ajax(ajaxurl,{type:"POST",data:{action:"blocksy_dismissed_notice_handler"}})},type:"button",className:"notice-dismiss"},Object(r.createElement)("span",{className:"screen-reader-text"},Object(o.__)("Dismiss this notice.","blocksy"))),Object(r.createElement)("span",{className:"ct-notification-icon"},Object(r.createElement)("svg",{width:"70",viewBox:"0 0 20 17"},Object(r.createElement)("rect",{x:"3",width:"5",height:"5.15",rx:"1.5",fill:"#1D8FCA",opacity:"0.6"}),Object(r.createElement)("rect",{x:"12",width:"5",height:"5.15",rx:"1.5",fill:"#1D8FCA",opacity:"0.6"}),Object(r.createElement)("rect",{y:"2.58",width:"20",height:"14.42",rx:"2.5",fill:"#1D8FCA"}))),Object(r.createElement)("div",{className:"ct-notification-content"},Object(r.createElement)("h2",null,Object(o.__)("Thanks for installing Blocksy, you rock!","blocksy")),Object(r.createElement)("p",{dangerouslySetInnerHTML:{__html:Object(o.__)("We strongly recommend you to activate the <b>Blocksy Companion</b> plugin.<br>This way you will have access to custom extensions, demo templates and many other awesome features.","blocksy")}}),Object(r.createElement)("div",{className:"notice-actions"},"uninstalled"===u&&Object(r.createElement)("a",{className:"button button-primary",href:l,target:"_blank"},Object(o.__)("Download Blocksy Companion","blocksy")),"uninstalled"!==u&&Object(r.createElement)("button",{className:"button button-primary",disabled:m||"active"===u,onClick:function(){d(!0),setTimeout((function(){})),a.a.ajax(ajaxurl,{type:"POST",data:{action:"blocksy_notice_button_click"}}).then((function(t){var e=t.success,n=t.data;e&&(b(n.status),"active"===n.status&&location.assign(c)),d(!1)}))}},m?Object(o.__)("Activating...","blocksy"):"uninstalled"===u?Object(o.__)("Install Blocksy Companion","blocksy"):"installed"===u?Object(o.__)("Activate Blocksy Companion","blocksy"):Object(o.__)("Blocksy Companion active!","blocksy"),m&&Object(r.createElement)("i",{className:"dashicons dashicons-update"})),Object(r.createElement)("a",{className:"button",href:n},Object(o.__)("Theme Dashboard","blocksy")))))};function u(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return b(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var y=function(t){t.querySelector(".notice-blocksy-plugin-root")&&Object(r.render)(Object(r.createElement)(s,{initialStatus:t.querySelector(".notice-blocksy-plugin-root").dataset.pluginStatus,url:t.querySelector(".notice-blocksy-plugin-root").dataset.url,pluginUrl:t.querySelector(".notice-blocksy-plugin-root").dataset.pluginUrl,pluginLink:t.querySelector(".notice-blocksy-plugin-root").dataset.link}),t.querySelector(".notice-blocksy-plugin-root")),u(document.querySelectorAll("[data-dismiss]")).map((function(t){t.addEventListener("click",(function(e){e.preventDefault(),t.closest(".notice-blocksy-new-hero").remove(),a.a.ajax(ajaxurl,{type:"POST",data:{action:"blocksy_dismissed_new_hero_notice"}})}))}))}}}]);