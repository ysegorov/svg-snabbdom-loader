/*
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @author  Yuri Egorov <ysegorov at gmail dot com>
 */

'use strict';

var loaderUtils = require('loader-utils');
var path = require('path');
var cheerio = require('cheerio');

function isFill(key) { return key === 'fill'; }

function omitFill(obj) {
    var o = {},
        keys = Object.keys(obj);
    keys.forEach(function (k) {
        if (isFill(k)) { return; }
        o[k] = obj[k];
    });
    return o;
}

function tagToH(tag, opts) {
    var children = tag.children || [],
        nested = [],
        cnt = children.length,
        attrs,
        i;
    opts = opts || {};

    for (i=0; i<cnt; i+=1) {
        if (children[i].type === 'tag') {
            nested.push(tagToH(children[i], {omitFill: opts.omitFill}));
        }
    }

    var key = opts.key ? 'key: \'' + opts.key + '\',\n' : '';
    attrs = tag.attribs ? 'attrs: ' + JSON.stringify(opts.omitFill ? omitFill(tag.attribs) : tag.attribs) : '';
    nested = '[' + nested.join(',\n') + ']';

    return 'h(\'' + tag.name + '\', {' + key + attrs + '},\n' + nested + ')';
}

module.exports = function(content) {

    this.cacheable && this.cacheable();

    var query = loaderUtils.parseQuery(this.query);
    var key = 'svg-' + path.basename(this.resourcePath).slice(0, -4);
    var text = '\n\'use strict\';\n' + 'var h = require(\'snabbdom/h\').default;\n';
    var opts = {omitFill: query.omitFill};

    if (!query.omitKey) {
        opts.key = key;
    }

    content = content.toString('utf8');

    var $content = cheerio.load(content, {xmlMode: true});
    var $svg = $content('svg');
    var viewBox = $svg.attr('viewBox');

    text += 'module.exports = ' + tagToH({
        name: 'svg',
        attribs: {viewBox: viewBox, class: query.className || 'svg-icon'},
        children: $svg.contents()}, opts) + ';';

    return text;
};
module.exports.tagToH = tagToH;
module.exports.omitFill = omitFill;
