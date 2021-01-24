const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7001',
      pathRewrite: { '/api': '' },
    }),
    createProxyMiddleware('/public', {
      target: 'http://localhost:7001/public',
      pathRewrite: { '/public': '' },
    })
  );
};
