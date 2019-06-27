const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            { from: './node_modules/jsxgraph/distrib/jsxgraphcore.js', to: '.' },
            { from: './node_modules/jsxgraph/distrib/jsxgraph.css', to: '.' },
        ]),
    ]
}