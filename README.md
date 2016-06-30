# svg-snabbdom-loader

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)
[![Build Status](https://travis-ci.org/ysegorov/svg-snabbdom-loader.svg?branch=master)](https://travis-ci.org/ysegorov/svg-snabbdom-loader)

Webpack svg to [snabbdom](https://github.com/paldepind/snabbdom) vnode loader


[![NPM](https://nodei.co/npm/svg-snabbdom-loader.png)](https://www.npmjs.com/package/svg-snabbdom-loader)


## Installation

```shell

$ npm install --save-dev svg-snabbdom-loader

```

## Parameters

Loader supports following parameters:

- `omitFill` used to omit `fill` attribute from generated VNode attributes
  (defaults to keep `fill` attribute as is)
- `omitKey` used to omit `key` attribute from generated top-level svg VNode
  attributes (generated key defaults to `svg-{basename}` where `{basename}` is
  filename without `.svg` extension)
- `className` used to set `class` attribute for generated top-level svg VNode
  (defaults to `svg-icon`)


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Specify in `webpack.config.js`:

```javascript
module.exports = {
    //...
    module: {
        loaders: [{
            test: /\.svg$/,
            loader: 'svg-snabbdom-loader'
        }]
    },
    //...
};
```

Chained with [svgo-loader](https://github.com/rpominov/svgo-loader):

```javascript
module.exports = {
    //...
    module: {
        loaders: [{
            test: /\.svg$/,
            loader: 'svg-snabbdom-loader!svgo-loader'
        }]
    },
    //...
};
```

With parameters:

```javascript
module.exports = {
    //...
    module: {
        loaders: [{
            test: /\.svg$/,
            loader: 'svg-snabbdom-loader?omitFill=true&className=svg-icon-large!svgo-loader'
        }]
    },
    //...
};
```

Splitting filled and non-filled graphics:

```javascript
module.exports = {
    //...
    module: {
        loaders: [{
            test: /\.svg$/,
            include: /src\/svg\/filled/
            loader: 'svg-snabbdom-loader?className=svg-filled!svgo-loader'
        }, {
            test: /\.svg$/,
            include: /src\/svg\/nonfilled/
            loader: 'svg-snabbdom-loader?className=svg-non-filled!svgo-loader'
        }]
    },
    //...
};
```


## License

MIT, see [LICENSE.md](http://github.com/ysegorov/svg-snabbdom-loader/blob/master/LICENSE.md) for details.
