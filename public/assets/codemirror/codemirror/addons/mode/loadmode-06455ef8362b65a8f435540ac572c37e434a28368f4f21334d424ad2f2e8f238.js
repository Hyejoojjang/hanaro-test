!function(r){"object"==typeof exports&&"object"==typeof module?r(require("../../lib/codemirror"),"cjs"):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],function(e){r(e,"amd")}):r(CodeMirror,"plain")}(function(d,u){function f(e,r){var o=r;return function(){0==--o&&e()}}function a(e,r){var o=d.modes[e].dependencies;if(!o)return r();for(var n=[],t=0;t<o.length;++t)d.modes.hasOwnProperty(o[t])||n.push(o[t]);if(!n.length)return r();var i=f(r,n.length);for(t=0;t<n.length;++t)d.requireMode(n[t],i)}d.modeURL||(d.modeURL="../mode/%N/%N.js");var c={};d.requireMode=function(e,r){if("string"!=typeof e&&(e=e.name),d.modes.hasOwnProperty(e))return a(e,r);if(c.hasOwnProperty(e))return c[e].push(r);var o=d.modeURL.replace(/%N/g,e);if("plain"==u){var n=document.createElement("script");n.src=o;var t=document.getElementsByTagName("script")[0],i=c[e]=[r];d.on(n,"load",function(){a(e,function(){for(var e=0;e<i.length;++e)i[e]()})}),t.parentNode.insertBefore(n,t)}else"cjs"==u?(require(o),r()):"amd"==u&&requirejs([o],r)},d.autoLoadMode=function(e,r){d.modes.hasOwnProperty(r)||d.requireMode(r,function(){e.setOption("mode",e.getOption("mode"))})}});