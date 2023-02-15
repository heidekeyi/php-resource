const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/serviceAxios',
        createProxyMiddleware({
            target: 'http://daily.cn',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/serviceAxios",
            }
        })
    );
};