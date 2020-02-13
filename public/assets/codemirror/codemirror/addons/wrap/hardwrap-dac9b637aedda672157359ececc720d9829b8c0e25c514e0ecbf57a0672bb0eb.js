!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(x){"use strict";function l(t,r,e){for(var n=e.paragraphStart||t.getHelper(r,"paragraphStart"),o=r.line,a=t.firstLine();a<o;--o){var i=t.getLine(o);if(n&&n.test(i))break;if(!/\S/.test(i)){++o;break}}for(var f=e.paragraphEnd||t.getHelper(r,"paragraphEnd"),l=r.line+1,h=t.lastLine();l<=h;++l){i=t.getLine(l);if(f&&f.test(i)){++l;break}if(!/\S/.test(i))break}return{from:o,to:l}}function S(t,r,e,n){for(var o=r;o<t.length&&" "==t.charAt(o);)o++;for(;0<o&&!e.test(t.slice(o-1,o+1));--o);for(var a=!0;;a=!1){var i=o;if(n)for(;" "==t.charAt(i-1);)--i;if(0!=i||!a)return{from:i,to:o};o=r}}function h(e,t,r,n){t=e.clipPos(t),r=e.clipPos(r);var o=n.column||80,a=n.wrapOn||/\s\S|-[^\.\d]/,i=!1!==n.killTrailingSpace,f=[],l="",h=t.line,s=e.getRange(t,r,!1);if(!s.length)return null;var c=s[0].match(/^[ \t]*/)[0];c.length>=o&&(o=c.length+1);for(var g=0;g<s.length;++g){var p=s[g],u=l.length,m=0;l&&p&&!a.test(l.charAt(l.length-1)+p.charAt(0))&&(l+=" ",m=1);var v="";if(g&&(v=p.match(/^\s*/)[0],p=p.slice(v.length)),l+=p,g){var d=l.length>o&&c==v&&S(l,o,a,i);d&&d.from==u&&d.to==u+m?(l=c+p,++h):f.push({text:[m?" ":""],from:E(h,u),to:E(h+1,v.length)})}for(;l.length>o;){var b=S(l,o,a,i);f.push({text:["",c],from:E(h,b.from),to:E(h,b.to)}),l=c+l.slice(b.to),++h}}return f.length&&e.operation(function(){for(var t=0;t<f.length;++t){var r=f[t];(r.text||x.cmpPos(r.from,r.to))&&e.replaceRange(r.text,r.from,r.to)}}),f.length?{from:f[0].from,to:x.changeEnd(f[f.length-1])}:null}var E=x.Pos;x.defineExtension("wrapParagraph",function(t,r){r=r||{},t||(t=this.getCursor());var e=l(this,t,r);return h(this,E(e.from,0),E(e.to-1),r)}),x.commands.wrapLines=function(i){i.operation(function(){for(var t=i.listSelections(),r=i.lastLine()+1,e=t.length-1;0<=e;e--){var n,o=t[e];if(o.empty()){var a=l(i,o.head,{});n={from:E(a.from,0),to:E(a.to-1)}}else n={from:o.from(),to:o.to()};n.to.line>=r||(r=n.from.line,h(i,n.from,n.to,{}))}})},x.defineExtension("wrapRange",function(t,r,e){return h(this,t,r,e||{})}),x.defineExtension("wrapParagraphsInRange",function(t,r,e){e=e||{};for(var n=this,o=[],a=t.line;a<=r.line;){var i=l(n,E(a,0),e);o.push(i),a=i.to}var f=!1;return o.length&&n.operation(function(){for(var t=o.length-1;0<=t;--t)f=f||h(n,E(o[t].from,0),E(o[t].to-1),e)}),f})});