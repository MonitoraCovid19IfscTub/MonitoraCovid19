import 'reflect-metadata';

import express from 'express';

import '../typeorm';

import router from './routes/routes';

const server = express();

server.use(express.json());

server.use(router);

server.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('ok');
});
