const path = require('path');

module.exports = {

    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ],

        plugins: [
            new HtmlWebpackPlugin({
                template: 'client/index.html',
                filename: 'index.html',
                inject: 'body'
            })
        ],

    },

    devServer: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true
            }
        }
    }
    
};