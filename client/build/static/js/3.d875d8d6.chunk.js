(this.webpackJsonpprojectx=this.webpackJsonpprojectx||[]).push([[3],{196:function(e,t,n){(function(e){ace.define("ace/mode/ada_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var i=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,a=function(){var e=this.createKeywordMapper({"support.function":"count|min|max|avg|sum|rank|now|coalesce|main",keyword:"abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|in|protected|constant|interface|until||is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor","constant.language":"true|false|null"},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};i.inherits(a,r),t.AdaHighlightRules=a})),ace.define("ace/mode/ada",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ada_highlight_rules","ace/range"],(function(e,t,n){"use strict";var i=e("../lib/oop"),r=e("./text").Mode,a=e("./ada_highlight_rules").AdaHighlightRules,o=e("../range").Range,s=function(){this.HighlightRules=a,this.$behaviour=this.$defaultBehaviour};i.inherits(s,r),function(){this.lineCommentStart="--",this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e).tokens;if(r.length&&"comment"==r[r.length-1].type)return i;"start"==e&&(t.match(/^.*(begin|loop|then|is|do)\s*$/)&&(i+=n));return i},this.checkOutdent=function(e,t,n){return!!(t+n).match(/^\s*(begin|end)$/)},this.autoOutdent=function(e,t,n){var i=t.getLine(n),r=t.getLine(n-1),a=this.$getIndent(r).length;this.$getIndent(i).length<=a||t.outdentRows(new o(n,0,n+2,0))},this.$id="ace/mode/ada"}.call(s.prototype),t.Mode=s})),ace.require(["ace/mode/ada"],(function(t){e&&(e.exports=t)}))}).call(this,n(59)(e))}}]);
//# sourceMappingURL=3.d875d8d6.chunk.js.map