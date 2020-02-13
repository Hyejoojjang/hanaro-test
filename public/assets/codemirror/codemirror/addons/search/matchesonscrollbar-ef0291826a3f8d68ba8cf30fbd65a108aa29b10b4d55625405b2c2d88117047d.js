!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("./searchcursor"),require("../scroll/annotatescrollbar")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../scroll/annotatescrollbar"],t):t(CodeMirror)}(function(c){"use strict";function o(t,e,i,o){this.cm=t,this.options=o;var a={listenForChanges:!1};for(var n in o)a[n]=o[n];a.className||(a.className="CodeMirror-search-match"),this.annotation=t.annotateScrollbar(a),this.query=e,this.caseFold=i,this.gap={from:t.firstLine(),to:t.lastLine()+1},this.matches=[],this.update=null,this.findMatches(),this.annotation.update(this.matches);var s=this;t.on("change",this.changeHandler=function(t,e){s.onChange(e)})}function f(t,e,i){return t<=e?t:Math.max(e,t+i)}c.defineExtension("showMatchesOnScrollbar",function(t,e,i){return"string"==typeof i&&(i={className:i}),i||(i={}),new o(this,t,e,i)});var a=1e3;o.prototype.findMatches=function(){if(this.gap){for(var t=0;t<this.matches.length;t++){if((o=this.matches[t]).from.line>=this.gap.to)break;o.to.line>=this.gap.from&&this.matches.splice(t--,1)}for(var e=this.cm.getSearchCursor(this.query,c.Pos(this.gap.from,0),{caseFold:this.caseFold,multiline:this.options.multiline}),i=this.options&&this.options.maxMatches||a;e.findNext();){var o;if((o={from:e.from(),to:e.to()}).from.line>=this.gap.to)break;if(this.matches.splice(t++,0,o),this.matches.length>i)break}this.gap=null}},o.prototype.onChange=function(t){var e=t.from.line,i=c.changeEnd(t).line,o=i-t.to.line;if(this.gap?(this.gap.from=Math.min(f(this.gap.from,e,o),t.from.line),this.gap.to=Math.max(f(this.gap.to,e,o),t.from.line)):this.gap={from:t.from.line,to:i+1},o)for(var a=0;a<this.matches.length;a++){var n=this.matches[a],s=f(n.from.line,e,o);s!=n.from.line&&(n.from=c.Pos(s,n.from.ch));var r=f(n.to.line,e,o);r!=n.to.line&&(n.to=c.Pos(r,n.to.ch))}clearTimeout(this.update);var h=this;this.update=setTimeout(function(){h.updateAfterChange()},250)},o.prototype.updateAfterChange=function(){this.findMatches(),this.annotation.update(this.matches)},o.prototype.clear=function(){this.cm.off("change",this.changeHandler),this.annotation.clear()}});