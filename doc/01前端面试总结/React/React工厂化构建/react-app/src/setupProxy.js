const { createProxyMiddleware } = require('http-proxy-middleware');

const baseUrl = `http://localhost:7001`;

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: baseUrl,
      pathRewrite: { '/api': '' },
    }),
    createProxyMiddleware('/public', {
      target: `${baseUrl}/public`,
      pathRewrite: { '/public': '' },
    })
  );
};
