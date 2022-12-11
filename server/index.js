import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { logWarning, logError, logInfo, logSuccess } from './utils/log.js';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router/cats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(express.json({ limit: '50mb' })); //support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); //  support url encoded bodies

server.use(express.static(__dirname));

server.use(
  cors({
    origin: true,
    credentials: true
  })
);

//use express middeware for easier cookie handling
server.use(cookieParser());

(async () => {
  server.use(router);

  //start server
  server.listen(process.env.PORT, () =>
    logWarning(`Server listening on port ${process.env.PORT}`)
  );

  // uncaught exception or promise rejection
  process.on('unhandledRejection', error => {
    throw error;
  });

  process.on('uncaughtException', error => {
    logError('Uncaught Exception: ');
    logInfo(error);

    process.exit(1);
  });

  //end server
  process.on('SIGINT', () => {
    logWarning('Server closed!');
    process.exit(0);
  });
})();
