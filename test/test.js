var chai = require('chai');
var expect = chai.expect;
chai.should();

var gulpUtil = require('gulp-util');

var gulpCST = require('../');

it('should parse simple expression', function(done) {
    var stream = gulpCST();

    stream.on('data', function(file) {
        expect(file.tree).to.exist;
    })
    .on('end', done);

    stream.write(new gulpUtil.File({
        path: 'file.js',
        contents: new Buffer('({42:42})')
    }));

    stream.end();
});

it('should parse simple expression with CST tokens', function(done) {
    var stream = gulpCST();

    stream.on('data', function(file) {
        expect(file.tree.selectTokensByType('Punctuator')[0].value).to.eql('(');
    })
    .on('end', done);

    stream.write(new gulpUtil.File({
        path: 'file.js',
        contents: new Buffer('({42:42})')
    }));

    stream.end();
});
