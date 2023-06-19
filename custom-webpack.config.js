const webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            { test: /\.svg$/, use: "svg-inline-loader" },
            { test: /\.md$/, use: "text-loader" },
        ],
    },
    resolve: {
        fallback: {
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            url: require.resolve("url"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
