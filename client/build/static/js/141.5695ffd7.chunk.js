(this.webpackJsonpprojectx=this.webpackJsonpprojectx||[]).push([[141],{334:function(e,t,n){(function(e){ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,o=e("../../range").Range,s=t.FoldMode=function(){};r.inherits(s,i),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,s=e.getLine(n),a=s.search(i);if(-1!=a&&"#"==s[a]){for(var g=s.length,x=e.getLength(),c=n,l=n;++n<x;){var d=(s=e.getLine(n)).search(i);if(-1!=d){if("#"!=s[d])break;l=n}}if(l>c){var u=e.getLine(l).length;return new o(c,g,l,u)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),i=r.search(/\S/),o=e.getLine(n+1),s=e.getLine(n-1),a=s.search(/\S/),g=o.search(/\S/);if(-1==i)return e.foldWidgets[n-1]=-1!=a&&a<g?"start":"","";if(-1==a){if(i==g&&"#"==r[i]&&"#"==o[i])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(a==i&&"#"==r[i]&&"#"==s[i]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=a&&a<i?"start":"",i<g?"start":""}}.call(s.prototype)})),ace.define("ace/mode/snippets",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/folding/coffee"],(function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,o=e("./text_highlight_rules").TextHighlightRules,s=function(){var e="SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";this.$rules={start:[{token:"constant.language.escape",regex:/\\[\$}`\\]/},{token:"keyword",regex:"\\$(?:TM_)?(?:"+e+")\\b"},{token:"variable",regex:"\\$\\w+"},{onMatch:function(e,t,n){return n[1]?n[1]++:n.unshift(t,1),this.tokenName},tokenName:"markup.list",regex:"\\${",next:"varDecl"},{onMatch:function(e,t,n){return n[1]?(n[1]--,n[1]||n.splice(0,2),this.tokenName):"text"},tokenName:"markup.list",regex:"}"},{token:"doc.comment",regex:/^\${2}-{5,}$/}],varDecl:[{regex:/\d+\b/,token:"constant.numeric"},{token:"keyword",regex:"(?:TM_)?(?:"+e+")\\b"},{token:"variable",regex:"\\w+"},{regex:/:/,token:"punctuation.operator",next:"start"},{regex:/\//,token:"string.regex",next:"regexp"},{regex:"",next:"start"}],regexp:[{regex:/\\./,token:"escape"},{regex:/\[/,token:"regex.start",next:"charClass"},{regex:"/",token:"string.regex",next:"format"},{token:"string.regex",regex:"."}],charClass:[{regex:"\\.",token:"escape"},{regex:"\\]",token:"regex.end",next:"regexp"},{token:"string.regex",regex:"."}],format:[{regex:/\\[ulULE]/,token:"keyword"},{regex:/\$\d+/,token:"variable"},{regex:"/[gim]*:?",token:"string.regex",next:"start"},{token:"string",regex:"."}]}};r.inherits(s,o),t.SnippetHighlightRules=s;var a=function(){this.$rules={start:[{token:"text",regex:"^\\t",next:"sn-start"},{token:"invalid",regex:/^ \s*/},{token:"comment",regex:/^#.*/},{token:"constant.language.escape",regex:"^regex ",next:"regex"},{token:"constant.language.escape",regex:"^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"}],regex:[{token:"text",regex:"\\."},{token:"keyword",regex:"/"},{token:"empty",regex:"$",next:"start"}]},this.embedRules(s,"sn-",[{token:"text",regex:"^\\t",next:"sn-start"},{onMatch:function(e,t,n){return n.splice(n.length),this.tokenName},tokenName:"text",regex:"^(?!\t)",next:"start"}])};r.inherits(a,o),t.SnippetGroupHighlightRules=a;var g=e("./folding/coffee").FoldMode,x=function(){this.HighlightRules=a,this.foldingRules=new g,this.$behaviour=this.$defaultBehaviour};r.inherits(x,i),function(){this.$indentWithTabs=!0,this.lineCommentStart="#",this.$id="ace/mode/snippets",this.snippetFileId="ace/snippets/snippets"}.call(x.prototype),t.Mode=x})),ace.require(["ace/mode/snippets"],(function(t){e&&(e.exports=t)}))}).call(this,n(59)(e))}}]);
//# sourceMappingURL=141.5695ffd7.chunk.js.map