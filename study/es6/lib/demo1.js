'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <ul>\n    #for book in ', '\n      <li><i>#{book.title}</i> by #{book.author}</li>\n    #end\n  </ul>\n'], ['\n  <ul>\n    #for book in ', '\n      <li><i>#{book.title}</i> by #{book.author}</li>\n    #end\n  </ul>\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var myBooks = [{
	title: '说文',
	author: '解字'
}, {
	title: '语文',
	author: '李文强'
}, {
	title: '数学',
	author: '刘金生'
}, {
	title: '导师',
	author: '恶心'
}];
function hashTemplate(templateData) {
	var s = templateData[0];
	for (var i = 1; i < arguments.length; i++) {
		var arg = String(arguments[i]);
		// Escape special characters in the substitution.

		s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

		// Don't escape special characters in the template.
		s += templateData[i];
	}
	return s;
}
var libraryHtml = hashTemplate(_templateObject, myBooks);
console.log(libraryHtml);