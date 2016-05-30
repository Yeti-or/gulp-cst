var through = require('through2');
var Parser = require('cst').Parser;

module.exports = function(options) {
	var parser = new Parser(options);
    return through.obj(function(file, enc, next) {
        var fileContent = file.contents.toString(enc);
        file.tree = parser.parse(fileContent);
        next(null, file);
    });
};
