module.exports = {
    module: {
        rules: [
            { test: /\.svg$/, use: "svg-inline-loader" },
            { test: /\.md$/, use: "text-loader" },
        ],
    },
};
