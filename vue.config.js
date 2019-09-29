module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        // ? '/document/game'
        ? '/'
        : '/',
    devServer: {
        public: '0.0.0.0:4000',
        port: 4000,
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://nosmoking.com.tw',
                secure: false,
                changeOrigin: true
            }
        }
    }
}
