const path = require('path');
const webpack = require('webpack');


const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    mode: 'development',
    entry: {
        vue: 'vue',
        index: resolve('src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: resolve('dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // .Vue dosyaları içinde css kullanmak için
                        css: ['vue-style-loader', {
                            loader: 'css-loader',
                        }],

                        // .Vue dosyaları içinde  scss, sass kullanmak için
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],

                        // .Vue dosyaları içinde  js kullanmak için
                        js: [
                            'babel-loader',
                        ],
                    },

                },
            },
            {
                // .scss dosyaları çağırmak için.
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                // .Vue dışına yazdığımız js'leri çağırmak için.
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('node_modules/webpack-dev-server/client'),
                ],
            },
        ],
    },

    devtool: 'eval', // Debug için sourcemapleri aktif eder
    devServer: {
        // Development confileri
        host: 'localhost', //local url
        port: 8080, // local port
        open: true, // Development'da yeni pencerede projeyi açar
        watchOptions: {  // Development'da dosya değişiklikleri izleme ayarları
            poll: true, // Dosya değişiklikleri izlemeyi aktif ediyoruz
            ignored: /node_modules/, // node_modules ignore ediyoruz
        },
        // Dev server'ın kullanacağı yer
        publicPath: '/',
        // Assetlerin path'i
        contentBase: resolve('src'),
        // Dosya değişliğinde reload eder
        watchContentBase: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // Module güncelleme yaparak tüm sayfayı yenilemekten kurtuluyoruz
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        //Vue için ekstra derleme ayarları
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.vue', '.js', '.json'],
    },

    performance: {
        // webpack outputs performance related stuff in the browser.
        hints: false,
    },
};
