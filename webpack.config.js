/* eslint-disable no-undef */
module.exports = {
    module: {
        resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
};
