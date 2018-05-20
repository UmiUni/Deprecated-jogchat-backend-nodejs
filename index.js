/* eslint-disable no-console */
const logger = require('winston');
var express = require('express');
const app = express();
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const fe = next({ dev });
const handle = fe.getRequestHandler();

fe.prepare().then(() => {
  const api = require('./src/app');
  app.use('/api', api);
  const port = app.get('port') || 3000;

  app.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  app.get('/static/*', (req, res) => {
    handle(req, res);
  });

  app.get('*', (req, res) => {
    fe.render(req, res, req.path);
  });

  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Jogchat started on http://%s:%d', app.get('host'), port)
  );
});
