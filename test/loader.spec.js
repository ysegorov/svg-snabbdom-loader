/* global describe */
/* global it */
/* global __dirname */

var fs = require('fs');
var path = require('path');
var svgSnabbdomLoader = require('../');
var expect = require('expect.js');
var demo1 = path.resolve(__dirname, 'svg', 'demo1.svg');


describe('omitFill helper', function () {

    it('should omit fill from object props', function () {

        var o = {a: 1, fill: 2, b: 3};
        var res = svgSnabbdomLoader.omitFill(o);

        expect(res).to.be.eql({a: 1, b: 3});
    });
});


describe('tagToH helper', function () {

    it('should be ok if tag has no children', function () {
        var tag = {name: 'svg', attribs: {}};

        var resp = svgSnabbdomLoader.tagToH(tag, {});

        expect(resp).to.be('h(\'svg\', {attrs: {}},\n[])');
    });

    it('should be ok if tag has no attribs', function () {
        var tag = {name: 'svg'};

        var resp = svgSnabbdomLoader.tagToH(tag, {});

        expect(resp).to.be('h(\'svg\', {},\n[])');
    });

    it('should be ok if no opts specified', function () {
        var tag = {name: 'svg'};

        var resp = svgSnabbdomLoader.tagToH(tag);

        expect(resp).to.be('h(\'svg\', {},\n[])');
    });
});


describe('svg-snabbdom-loader', function () {


    it('should convert svg to commonjs module', function () {
        var ctx = {query: '', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('module.exports');
        expect(resp).to.contain('require(\'snabbdom/h\')');

    });

    it('should call context cacheable method if it exists', function () {
        var cnt = 0,
            ctx = {query: '', resourcePath: demo1, cacheable: function () { cnt += 1; }},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(cnt).to.be(1);

    });

    it('should keep key if omitKey is false in query', function () {
        var ctx = {query: '?omitKey=false', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('key: \'svg-demo1\'');

    });

    it('should omit key if omitKey is true in query', function () {
        var ctx = {query: '?omitKey=true', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).not.to.contain('key: \'svg-demo1\'');

    });

    it('should keep fill if omitFill is false in query', function () {
        var ctx = {query: '?omitFill=false', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('fill');

    });

    it('should omit fill if omitFill is true in query', function () {
        var ctx = {query: '?omitFill=true', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).not.to.contain('fill');

    });

    it('should set svg class name if className is specified in query', function () {
        var ctx = {query: '?className=svg-demo-icon', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('svg-demo-icon');

    });

    it('should set svg class name to default if no className is specified in query', function () {
        var ctx = {query: '', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('svg-icon');

    });

    it('should work with all query parameters specified', function () {
        var ctx = {query: '?className=svg-demo-icon&omitFill=true&omitKey=true', resourcePath: demo1},
            content = fs.readFileSync(demo1, {encoding: 'utf8'});

        var resp = svgSnabbdomLoader.call(ctx, content);

        expect(resp).to.be.ok();
        expect(resp).to.contain('svg-demo-icon');
        expect(resp).not.to.contain('fill');
        expect(resp).not.to.contain('key: \'svg-demo1\'');

    });

});
