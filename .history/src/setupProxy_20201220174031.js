const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7001',
      pathRewrite: { '^/api': '' },
    })
  );
  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://localhost:7001',
      pathRewrite: {
        '^/auth': '',
      },
    })
  );
};
