!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(f){function s(e,o,n){var t,i=e.getWrapperElement();return(t=i.appendChild(document.createElement("div"))).className=n?"CodeMirror-dialog CodeMirror-dialog-bottom":"CodeMirror-dialog CodeMirror-dialog-top","string"==typeof o?t.innerHTML=o:t.appendChild(o),f.addClass(i,"dialog-opened"),t}function p(e,o){e.state.currentNotificationClose&&e.state.currentNotificationClose(),e.state.currentNotificationClose=o}f.defineExtension("openDialog",function(e,o,n){function t(e){if("string"==typeof e)a.value=e;else{if(u)return;u=!0,f.rmClass(r.parentNode,"dialog-opened"),r.parentNode.removeChild(r),l.focus(),n.onClose&&n.onClose(r)}}n||(n={}),p(this,null);var i,r=s(this,e,n.bottom),u=!1,l=this,a=r.getElementsByTagName("input")[0];return a?(a.focus(),n.value&&(a.value=n.value,!1!==n.selectValueOnOpen&&a.select()),n.onInput&&f.on(a,"input",function(e){n.onInput(e,a.value,t)}),n.onKeyUp&&f.on(a,"keyup",function(e){n.onKeyUp(e,a.value,t)}),f.on(a,"keydown",function(e){n&&n.onKeyDown&&n.onKeyDown(e,a.value,t)||((27==e.keyCode||!1!==n.closeOnEnter&&13==e.keyCode)&&(a.blur(),f.e_stop(e),t()),13==e.keyCode&&o(a.value,e))}),!1!==n.closeOnBlur&&f.on(a,"blur",t)):(i=r.getElementsByTagName("button")[0])&&(f.on(i,"click",function(){t(),l.focus()}),!1!==n.closeOnBlur&&f.on(i,"blur",t),i.focus()),t}),f.defineExtension("openConfirm",function(e,o,n){function t(){u||(u=!0,f.rmClass(i.parentNode,"dialog-opened"),i.parentNode.removeChild(i),l.focus())}p(this,null);var i=s(this,e,n&&n.bottom),r=i.getElementsByTagName("button"),u=!1,l=this,a=1;r[0].focus();for(var c=0;c<r.length;++c){var d=r[c];!function(o){f.on(d,"click",function(e){f.e_preventDefault(e),t(),o&&o(l)})}(o[c]),f.on(d,"blur",function(){--a,setTimeout(function(){a<=0&&t()},200)}),f.on(d,"focus",function(){++a})}}),f.defineExtension("openNotification",function(e,o){function n(){r||(r=!0,clearTimeout(t),f.rmClass(i.parentNode,"dialog-opened"),i.parentNode.removeChild(i))}p(this,n);var t,i=s(this,e,o&&o.bottom),r=!1,u=o&&"undefined"!=typeof o.duration?o.duration:5e3;return f.on(i,"click",function(e){f.e_preventDefault(e),n()}),u&&(t=setTimeout(n,u)),n})});