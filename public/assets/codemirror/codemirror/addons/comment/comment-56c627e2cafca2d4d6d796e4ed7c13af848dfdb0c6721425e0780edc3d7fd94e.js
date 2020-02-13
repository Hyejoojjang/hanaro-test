!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function s(e){var n=e.search(M);return-1==n?0:n}function i(e,n,t){return/\bstring\b/.test(e.getTokenTypeAt(S(n.line,0)))&&!/^[\'\"\`]/.test(t)}function y(e,n){var t=e.getMode();return!1!==t.useInnerComments&&t.innerMode?e.getModeAt(n):t}var E={},M=/[^\s\u00a0]/,S=e.Pos;e.commands.toggleComment=function(e){e.toggleComment()},e.defineExtension("toggleComment",function(e){e||(e=E);for(var n=this,t=Infinity,i=this.listSelections(),l=null,o=i.length-1;0<=o;o--){var r=i[o].from(),a=i[o].to();r.line>=t||(a.line>=t&&(a=S(t,0)),t=r.line,null==l?n.uncomment(r,a,e)?l="un":(n.lineComment(r,a,e),l="line"):"un"==l?n.uncomment(r,a,e):n.lineComment(r,a,e))}}),e.defineExtension("lineComment",function(o,e,r){r||(r=E);var a=this,n=y(a,o),t=a.getLine(o.line);if(null!=t&&!i(a,o,t)){var m=r.lineComment||n.lineComment;if(m){var c=Math.min(0!=e.ch||e.line==o.line?e.line+1:e.line,a.lastLine()+1),f=null==r.padding?" ":r.padding,g=r.commentBlankLines||o.line==e.line;a.operation(function(){if(r.indent){for(var e=null,n=o.line;n<c;++n){var t=(i=a.getLine(n)).slice(0,s(i));(null==e||e.length>t.length)&&(e=t)}for(n=o.line;n<c;++n){var i=a.getLine(n),l=e.length;(g||M.test(i))&&(i.slice(0,l)!=e&&(l=s(i)),a.replaceRange(e+m+f,S(n,0),S(n,l)))}}else for(n=o.line;n<c;++n)(g||M.test(a.getLine(n)))&&a.replaceRange(m+f,S(n,0))})}else(r.blockCommentStart||n.blockCommentStart)&&(r.fullLines=!0,a.blockComment(o,e,r))}}),e.defineExtension("blockComment",function(i,l,o){o||(o=E);var r=this,a=y(r,i),m=o.blockCommentStart||a.blockCommentStart,c=o.blockCommentEnd||a.blockCommentEnd;if(m&&c){if(!/\bcomment\b/.test(r.getTokenTypeAt(S(i.line,0)))){var f=Math.min(l.line,r.lastLine());f!=i.line&&0==l.ch&&M.test(r.getLine(f))&&--f;var g=null==o.padding?" ":o.padding;i.line>f||r.operation(function(){if(0!=o.fullLines){var e=M.test(r.getLine(f));r.replaceRange(g+c,S(f)),r.replaceRange(m+g,S(i.line,0));var n=o.blockCommentLead||a.blockCommentLead;if(null!=n)for(var t=i.line+1;t<=f;++t)(t!=f||e)&&r.replaceRange(n+g,S(t,0))}else r.replaceRange(c,l),r.replaceRange(m,i)})}}else(o.lineComment||a.lineComment)&&0!=o.fullLines&&r.lineComment(i,l,o)}),e.defineExtension("uncomment",function(e,n,t){t||(t=E);var l,o=this,i=y(o,e),r=Math.min(0!=n.ch||n.line==e.line?n.line:n.line-1,o.lastLine()),a=Math.min(e.line,r),m=t.lineComment||i.lineComment,c=[],f=null==t.padding?" ":t.padding;e:if(m){for(var g=a;g<=r;++g){var s=o.getLine(g),d=s.indexOf(m);if(-1<d&&!/comment/.test(o.getTokenTypeAt(S(g,d+1)))&&(d=-1),-1==d&&M.test(s))break e;if(-1<d&&M.test(s.slice(0,d)))break e;c.push(s)}if(o.operation(function(){for(var e=a;e<=r;++e){var n=c[e-a],t=n.indexOf(m),i=t+m.length;t<0||(n.slice(i,i+f.length)==f&&(i+=f.length),l=!0,o.replaceRange("",S(e,t),S(e,i)))}}),l)return!0}var u=t.blockCommentStart||i.blockCommentStart,h=t.blockCommentEnd||i.blockCommentEnd;if(!u||!h)return!1;var p=t.blockCommentLead||i.blockCommentLead,v=o.getLine(a),C=v.indexOf(u);if(-1==C)return!1;var b=r==a?v:o.getLine(r),k=b.indexOf(h,r==a?C+u.length:0),L=S(a,C+1),x=S(r,k+1);if(-1==k||!/comment/.test(o.getTokenTypeAt(L))||!/comment/.test(o.getTokenTypeAt(x))||-1<o.getRange(L,x,"\n").indexOf(h))return!1;var R=v.lastIndexOf(u,e.ch),O=-1==R?-1:v.slice(0,e.ch).indexOf(h,R+u.length);if(-1!=R&&-1!=O&&O+h.length!=e.ch)return!1;O=b.indexOf(h,n.ch);var T=b.slice(n.ch).lastIndexOf(u,O-n.ch);return R=-1==O||-1==T?-1:n.ch+T,(-1==O||-1==R||R==n.ch)&&(o.operation(function(){o.replaceRange("",S(r,k-(f&&b.slice(k-f.length,k)==f?f.length:0)),S(r,k+h.length));var e=C+u.length;if(f&&v.slice(e,e+f.length)==f&&(e+=f.length),o.replaceRange("",S(a,C),S(a,e)),p)for(var n=a+1;n<=r;++n){var t=o.getLine(n),i=t.indexOf(p);if(-1!=i&&!M.test(t.slice(0,i))){var l=i+p.length;f&&t.slice(l,l+f.length)==f&&(l+=f.length),o.replaceRange("",S(n,i),S(n,l))}}}),!0)})});