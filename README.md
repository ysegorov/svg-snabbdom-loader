# svg-snabbdom-loader

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Webpack svg to [snabbdom](https://github.com/paldepind/snabbdom) vnode loader


## Installation

```shell

$ npm install --save-dev svg-snabbdom-loader

```

## Parameters

Loader supports following parameters:

- `omitFill` used to omit `fill` attribute from generated VNode attributes
- `omitKey` used to omit `key` attribute from generated top-level svg VNode
  attributes
- `className` used to set `class` attribute for generated top-level svg VNode
  (defaults to `svg-icon`)


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Specify in `webpack.config.js`:

```javascript
module.exports = {
    //...
    module: {
        loaders: [
            {test: /\.svg$/, loader: 'svg-snabbdom-loader'}
        ]
    },
    //...
};
```

Chained with [svgo-loader](https://github.com/rpominov/svgo-loader):

```javascript
module.exports = {
    //...
    module: {
        loaders: [
            {test: /\.svg$/, loader: 'svg-snabbdom-loader!svgo-loader'}
        ]
    },
    //...
};
```


[![NPM](https://nodei.co/npm/svg-snabbdom-loader.png)](https://www.npmjs.com/package/svg-snabbdom-loader)

## License

MIT, see [LICENSE.md](http://github.com/ysegorov/svg-snabbdom-loader/blob/master/LICENSE.md) for details.
