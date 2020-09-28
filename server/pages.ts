import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const HTML_REQ_HEADERS = [
    'text/html',
    'application/xhtml+xml',
    'application/xml',
];
  
const routes = express.Router();

routes.use((req, res, next) => {
  // @ts-ignore
  req.isRequestForHTML = HTML_REQ_HEADERS.some(str => req?.headers?.accept?.includes(str));
  next();
});

routes.get('*', async (req, res, next) => {
  // @ts-ignore
  if (!req.isRequestForHTML) {
    next();
    return;
  }

  res.sendFile(path.resolve(__dirname, '../main/build', 'index.html'));
});

export default routes;