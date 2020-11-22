(this.webpackJsonpprojectx=this.webpackJsonpprojectx||[]).push([[106],{299:function(e,t,n){(function(e){ace.define("ace/mode/pascal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var i=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,r=function(){var e=this.createKeywordMapper({"keyword.control":"absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor"},"identifier",!0);this.$rules={start:[{caseInsensitive:!0,token:["variable","text","storage.type.prototype","entity.name.function.prototype"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?(?=(?:\\(.*?\\))?;\\s*(?:attribute|forward|external))"},{caseInsensitive:!0,token:["variable","text","storage.type.function","entity.name.function"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?"},{caseInsensitive:!0,token:e,regex:/\b[a-z_]+\b/},{token:"constant.numeric",regex:"\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"punctuation.definition.comment",regex:"--.*$"},{token:"punctuation.definition.comment",regex:"//.*$"},{token:"punctuation.definition.comment",regex:"\\(\\*",push:[{token:"punctuation.definition.comment",regex:"\\*\\)",next:"pop"},{defaultToken:"comment.block.one"}]},{token:"punctuation.definition.comment",regex:"\\{",push:[{token:"punctuation.definition.comment",regex:"\\}",next:"pop"},{defaultToken:"comment.block.two"}]},{token:"punctuation.definition.string.begin",regex:'"',push:[{token:"constant.character.escape",regex:"\\\\."},{token:"punctuation.definition.string.end",regex:'"',next:"pop"},{defaultToken:"string.quoted.double"}]},{token:"punctuation.definition.string.begin",regex:"'",push:[{token:"constant.character.escape.apostrophe",regex:"''"},{token:"punctuation.definition.string.end",regex:"'",next:"pop"},{defaultToken:"string.quoted.single"}]},{token:"keyword.operator",regex:"[+\\-;,/*%]|:=|="}]},this.normalizeRules()};i.inherits(r,o),t.PascalHighlightRules=r})),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,n){"use strict";var i=e("../../lib/oop"),o=e("./fold_mode").FoldMode,r=e("../../range").Range,a=t.FoldMode=function(){};i.inherits(a,o),function(){this.getFoldWidgetRange=function(e,t,n){var i=this.indentationBlock(e,n);if(i)return i;var o=/\S/,a=e.getLine(n),s=a.search(o);if(-1!=s&&"#"==a[s]){for(var c=a.length,l=e.getLength(),u=n,d=n;++n<l;){var p=(a=e.getLine(n)).search(o);if(-1!=p){if("#"!=a[p])break;d=n}}if(d>u){var g=e.getLine(d).length;return new r(u,c,d,g)}}},this.getFoldWidget=function(e,t,n){var i=e.getLine(n),o=i.search(/\S/),r=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),c=r.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=s&&s<c?"start":"","";if(-1==s){if(o==c&&"#"==i[o]&&"#"==r[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==o&&"#"==i[o]&&"#"==a[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=s&&s<o?"start":"",o<c?"start":""}}.call(a.prototype)})),ace.define("ace/mode/pascal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/pascal_highlight_rules","ace/mode/folding/coffee"],(function(e,t,n){"use strict";var i=e("../lib/oop"),o=e("./text").Mode,r=e("./pascal_highlight_rules").PascalHighlightRules,a=e("./folding/coffee").FoldMode,s=function(){this.HighlightRules=r,this.foldingRules=new a,this.$behaviour=this.$defaultBehaviour};i.inherits(s,o),function(){this.lineCommentStart=["--","//"],this.blockComment=[{start:"(*",end:"*)"},{start:"{",end:"}"}],this.$id="ace/mode/pascal"}.call(s.prototype),t.Mode=s})),ace.require(["ace/mode/pascal"],(function(t){e&&(e.exports=t)}))}).call(this,n(59)(e))}}]);
//# sourceMappingURL=106.afaa7202.chunk.js.map