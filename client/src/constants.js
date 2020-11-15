
const snippetColors = [
	"rgb(76 175 80 / 22%)",
	"rgb(156 39 176 / 33%)",
	"rgb(233 30 99 / 53%)",
	"rgb(0 150 136 / 35%)",
	"#ff572275",
	"rgb(33 150 243 / 34%)",
	"#ffeb3b4d",
  "rgb(103 58 183 / 45%)"
];

const languages = ["ada", 
"arduino", "bash", 
"bat", "c", "clojure", "cobol", "cobolfree", "coffee-script", "cpp", "csharp", 
"css", "fortran", "go", "haskell", "hexdump", "html", "java", "javascript", "jsp", 
"julia", "kotlin", "less", "lua", "make", "matlab", "md", "objective-c",
 "perl", "php", "prolog", "python", "rust", "sql", "swift",
];

const snippetsDataMock = [ 
			{
			    url: "http://127.0.0.1:8000/api/snippets/1/?format=json",
			    id: 1,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/1/highlight/?format=json",
			    title: "Fullstack web developer",
			    code: "urlpatterns += [\r\n    path('api-auth/', include('rest_framework.urls')),\r\n]",
			    linenos: false,
			    language: "python",
			    style: "colorful"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/2/?format=json",
			    id: 2,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/2/highlight/?format=json",
			    title: "Permissions",
			    code: 'from rest_framework import permissions\r\n\r\n\r\nclass IsOwnerOrReadOnly(permissions.BasePermission):\r\n    """\r\n    Custom permission to only allow owners of an object to edit it.\r\n    """\r\n\r\n    def has_object_permission(self, request, view, obj):\r\n        # Read permissions are allowed to any request,\r\n        # so we\'ll always allow GET, HEAD or OPTIONS requests.\r\n        if request.method in permissions.SAFE_METHODS:\r\n            return True\r\n\r\n        # Write permissions are only allowed to the owner of the snippet.\r\n        return obj.owner == request.user',
			    linenos: false,
			    language: "python",
			    style: "monokai"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/3/?format=json",
			    id: 3,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/3/highlight/?format=json",
			    title: "Javascript test",//eslint-disable-next-line
			    code: "<script>alert(1);<\/script>",
			    linenos: true,
			    language: "js",
			    style: "monokai"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/4/?format=json",
			    id: 4,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/4/highlight/?format=json",
			    title: "Javascript Arrays",
			    code: 'var vegetables = [\'Cabbage\', \'Turnip\', \'Radish\', \'Carrot\'];\r\nconsole.log(vegetables); \r\n// ["Cabbage", "Turnip", "Radish", "Carrot"]\r\n\r\nvar pos = 1, n = 2;\r\n\r\nvar removedItems = vegetables.splice(pos, n); \r\n// this is how to remove items, n defines the number of items to be removed,\r\n// from that position(pos) onward to the end of array.\r\n\r\nconsole.log(vegetables); \r\n// ["Cabbage", "Carrot"] (the original array is changed)\r\n\r\nconsole.log(removedItems); \r\n// ["Turnip", "Radish"]',
			    linenos: true,
			    language: "js",
			    style: "emacs"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/5/?format=json",
			    id: 5,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/5/highlight/?format=json",
			    title: "ikhan",
			    code: "print(12346)",
			    linenos: false,
			    language: "python",
			    style: "friendly"
			} 
		]

export { snippetColors, languages, snippets };