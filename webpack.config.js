const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.app
        }]
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,

            // Enable sourcemaps
            devtool: 'eval-source-map',

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Prase host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build') {
    module.exports = merge(common, {});
}
