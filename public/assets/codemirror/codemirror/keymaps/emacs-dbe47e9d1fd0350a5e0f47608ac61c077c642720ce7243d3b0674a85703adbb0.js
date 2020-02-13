!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../lib/codemirror")):"function"==typeof define&&define.amd?define(["../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";function a(t,e){return t.line==e.line&&t.ch==e.ch}function i(t){M.push(t),50<M.length&&M.shift()}function l(t){if(!M.length)return i(t);M[M.length-1]+=t}function n(t){return M[M.length-(t?Math.min(t,1):1)]||""}function e(){return 1<M.length&&M.pop(),n()}function c(t,e,n,r,o){null==o&&(o=t.getRange(e,n)),"grow"==r&&B&&B.cm==t&&a(e,B.pos)&&t.isClean(B.gen)?l(o):!1!==r&&i(o),t.replaceRange("",e,n,"+delete"),B="grow"==r?{cm:t,pos:e,gen:t.changeGeneration()}:null}function r(t,e,n){return t.findPosH(e,n,"char",!0)}function o(t,e,n){return t.findPosH(e,n,"word",!0)}function u(t,e,n){return t.findPosV(e,n,"line",t.doc.sel.goalColumn)}function f(t,e,n){return t.findPosV(e,n,"page",t.doc.sel.goalColumn)}function s(t,e,n){for(var r=e.line,o=t.getLine(r),i=/\S/.test(n<0?o.slice(0,e.ch):o.slice(e.ch)),l=t.firstLine(),c=t.lastLine();;){if((r+=n)<l||c<r)return t.clipPos(H(r-n,n<0?0:null));if(o=t.getLine(r),/\S/.test(o))i=!0;else if(i)return H(r,0)}}function g(t,e,n){for(var r=e.line,o=e.ch,i=t.getLine(e.line),l=!1;;){var c=i.charAt(o+(n<0?-1:0));if(c){if(l&&/[!?.]/.test(c))return H(r,o+(0<n?1:0));l||(l=/\w/.test(c)),o+=n}else{if(r==(n<0?t.firstLine():t.lastLine()))return H(r,o);if(i=t.getLine(r+n),!/\S/.test(i))return H(r,o);r+=n,o=n<0?i.length:0}}}function C(t,e,n){var r;if(t.findMatchingBracket&&(r=t.findMatchingBracket(e,{strict:!0}))&&r.match&&(r.forward?1:-1)==n)return 0<n?H(r.to.line,r.to.ch+1):r.to;for(var o=!0;;o=!1){var i=t.getTokenAt(e),l=H(e.line,n<0?i.start:i.end);if(!(o&&0<n&&i.end==e.ch)&&/\w/.test(i.string))return l;var c=t.findPosH(l,n,"char");if(a(l,c))return e;e=c}}function d(t,e){var n=t.state.emacsPrefix;return n?(P(t),"-"==n?-1:Number(n)):e?null:1}function p(e){var r="string"==typeof e?function(t){t.execCommand(e)}:e;return function(t){var e=d(t);r(t);for(var n=1;n<e;++n)r(t)}}function h(t,e,n,r){var o=d(t);o<0&&(r=-r,o=-o);for(var i=0;i<o;++i){var l=n(t,e,r);if(a(l,e))break;e=l}return e}function A(e,n){var t=function(t){t.extendSelection(h(t,t.getCursor(),e,n))};return t.motion=!0,t}function m(t,e,n,r){for(var o,i=t.listSelections(),l=i.length;l--;)c(t,o=i[l].head,h(t,o,e,n),r)}function v(t,e){if(t.somethingSelected()){for(var n,r=t.listSelections(),o=r.length;o--;)c(t,(n=r[o]).anchor,n.head,e);return!0}}function S(t,e){t.state.emacsPrefix?"-"!=e&&(t.state.emacsPrefix+=e):(t.state.emacsPrefix=e,t.on("keyHandled",w),t.on("inputRead",x))}function w(t,e){t.state.emacsPrefixMap||G.hasOwnProperty(e)||P(t)}function P(t){t.state.emacsPrefix=null,t.off("keyHandled",w),t.off("inputRead",x)}function x(t,e){var n=d(t);if(1<n&&"+input"==e.origin){for(var r=e.text.join("\n"),o="",i=1;i<n;++i)o+=r;t.replaceSelection(o)}}function L(t){t.state.emacsPrefixMap=!0,t.addKeyMap(T),t.on("keyHandled",R),t.on("inputRead",R)}function R(t,e){("string"!=typeof e||!/^\d$/.test(e)&&"Ctrl-U"!=e)&&(t.removeKeyMap(T),t.state.emacsPrefixMap=!1,t.off("keyHandled",R),t.off("inputRead",R))}function y(t){t.setCursor(t.getCursor()),t.setExtending(!t.getExtending()),t.on("change",function(){t.setExtending(!1)})}function k(t){t.setExtending(!1),t.setCursor(t.getCursor())}function b(t,e,n){t.openDialog?t.openDialog(e+': <input type="text" style="width: 10em"/>',n,{bottom:!0}):n(prompt(e,""))}function U(t,e){var n=t.getCursor(),r=t.findPosH(n,1,"word");t.replaceRange(e(t.getRange(n,r)),n,r),t.setCursor(r)}function X(t){for(var e=t.getCursor(),n=e.line,r=e.ch,o=[];n>=t.firstLine();){for(var i=t.getLine(n),l=null==r?i.length:r;0<l;){if(")"==(r=i.charAt(--l)))o.push("(");else if("]"==r)o.push("[");else if("}"==r)o.push("{");else if(/[\(\{\[]/.test(r)&&(!o.length||o.pop()!=r))return t.extendSelection(H(n,l))}--n,r=null}}function D(t){t.execCommand("clearSearch"),k(t)}function E(e){T[e]=function(t){S(t,e)},K["Ctrl-"+e]=function(t){S(t,e)},G["Ctrl-"+e]=!0}var H=t.Pos,M=[],B=null,G={"Alt-G":!0,"Ctrl-X":!0,"Ctrl-Q":!0,"Ctrl-U":!0};t.emacs={kill:c,killRegion:v,repeated:p};for(var K=t.keyMap.emacs=t.normalizeKeyMap({"Ctrl-W":function(t){c(t,t.getCursor("start"),t.getCursor("end"),!0)},"Ctrl-K":p(function(t){var e=t.getCursor(),n=t.clipPos(H(e.line)),r=t.getRange(e,n);/\S/.test(r)||(r+="\n",n=H(e.line+1,0)),c(t,e,n,"grow",r)}),"Alt-W":function(t){i(t.getSelection()),k(t)},"Ctrl-Y":function(t){var e=t.getCursor();t.replaceRange(n(d(t)),e,e,"paste"),t.setSelection(e,t.getCursor())},"Alt-Y":function(t){t.replaceSelection(e(),"around","paste")},"Ctrl-Space":y,"Ctrl-Shift-2":y,"Ctrl-F":A(r,1),"Ctrl-B":A(r,-1),Right:A(r,1),Left:A(r,-1),"Ctrl-D":function(t){m(t,r,1,!1)},Delete:function(t){v(t,!1)||m(t,r,1,!1)},"Ctrl-H":function(t){m(t,r,-1,!1)},Backspace:function(t){v(t,!1)||m(t,r,-1,!1)},"Alt-F":A(o,1),"Alt-B":A(o,-1),"Alt-Right":A(o,1),"Alt-Left":A(o,-1),"Alt-D":function(t){m(t,o,1,"grow")},"Alt-Backspace":function(t){m(t,o,-1,"grow")},"Ctrl-N":A(u,1),"Ctrl-P":A(u,-1),Down:A(u,1),Up:A(u,-1),"Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd",End:"goLineEnd",Home:"goLineStart","Alt-V":A(f,-1),"Ctrl-V":A(f,1),PageUp:A(f,-1),PageDown:A(f,1),"Ctrl-Up":A(s,-1),"Ctrl-Down":A(s,1),"Alt-A":A(g,-1),"Alt-E":A(g,1),"Alt-K":function(t){m(t,g,1,"grow")},"Ctrl-Alt-K":function(t){m(t,C,1,"grow")},"Ctrl-Alt-Backspace":function(t){m(t,C,-1,"grow")},"Ctrl-Alt-F":A(C,1),"Ctrl-Alt-B":A(C,-1,"grow"),"Shift-Ctrl-Alt-2":function(t){var e=t.getCursor();t.setSelection(h(t,e,C,1),e)},"Ctrl-Alt-T":function(t){var e=C(t,t.getCursor(),-1),n=C(t,e,1),r=C(t,n,1),o=C(t,r,-1);t.replaceRange(t.getRange(o,r)+t.getRange(n,o)+t.getRange(e,n),e,r)},"Ctrl-Alt-U":p(X),"Alt-Space":function(t){for(var e=t.getCursor(),n=e.ch,r=e.ch,o=t.getLine(e.line);n&&/\s/.test(o.charAt(n-1));)--n;for(;r<o.length&&/\s/.test(o.charAt(r));)++r;t.replaceRange(" ",H(e.line,n),H(e.line,r))},"Ctrl-O":p(function(t){t.replaceSelection("\n","start")}),"Ctrl-T":p(function(t){t.execCommand("transposeChars")}),"Alt-C":p(function(t){U(t,function(t){var e=t.search(/\w/);return-1==e?t:t.slice(0,e)+t.charAt(e).toUpperCase()+t.slice(e+1).toLowerCase()})}),"Alt-U":p(function(t){U(t,function(t){return t.toUpperCase()})}),"Alt-L":p(function(t){U(t,function(t){return t.toLowerCase()})}),"Alt-;":"toggleComment","Ctrl-/":p("undo"),"Shift-Ctrl--":p("undo"),"Ctrl-Z":p("undo"),"Cmd-Z":p("undo"),"Shift-Ctrl-Z":"redo","Shift-Alt-,":"goDocStart","Shift-Alt-.":"goDocEnd","Ctrl-S":"findPersistentNext","Ctrl-R":"findPersistentPrev","Ctrl-G":D,"Shift-Alt-5":"replace","Alt-/":"autocomplete",Enter:"newlineAndIndent","Ctrl-J":p(function(t){t.replaceSelection("\n","end")}),Tab:"indentAuto","Alt-G G":function(n){var t=d(n,!0);if(null!=t&&0<t)return n.setCursor(t-1);b(n,"Goto line",function(t){var e;t&&!isNaN(e=Number(t))&&e==(0|e)&&0<e&&n.setCursor(e-1)})},"Ctrl-X Tab":function(t){t.indentSelection(d(t,!0)||t.getOption("indentUnit"))},"Ctrl-X Ctrl-X":function(t){t.setSelection(t.getCursor("head"),t.getCursor("anchor"))},"Ctrl-X Ctrl-S":"save","Ctrl-X Ctrl-W":"save","Ctrl-X S":"saveAll","Ctrl-X F":"open","Ctrl-X U":p("undo"),"Ctrl-X K":"close","Ctrl-X Delete":function(t){c(t,t.getCursor(),g(t,t.getCursor(),1),"grow")},"Ctrl-X H":"selectAll","Ctrl-Q Tab":p("insertTab"),"Ctrl-U":L}),T={"Ctrl-G":P},N=0;N<10;++N)E(String(N));E("-")});