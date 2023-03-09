const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './build/index.html',
            filename: 'index.html',
            // Set the `src` path of your JavaScript files here
            scriptLoading: 'defer',
            scriptSrc: './build/static/js/main.*.js',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
};
