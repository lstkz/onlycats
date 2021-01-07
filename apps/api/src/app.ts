import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { logger } from './common/logger';
import { connect, createCollections } from './db';
import { domainMiddleware } from './middlewares/domainMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { notFoundHandlerMiddleware } from './middlewares/notFoundHandlerMiddleware';
import loadRoutes from './common/loadRoutes';
import { config } from './config';

const app = express();
const server = http.createServer(app);

Promise.all([connect()])
  .then(async () => {
    await createCollections();
    app.use(domainMiddleware);
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    app.get('/', (req, res) => {
      res.send('API is working 💪');
      res.end();
    });
    const apiRouter = express.Router();
    loadRoutes(apiRouter);
    app.use('/rpc', apiRouter);
    app.use(errorHandlerMiddleware);
    app.use(notFoundHandlerMiddleware);
    server.listen(config.port, '0.0.0.0', () => {
      logger.info(
        `Express HTTP server listening on port ${config.port} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch(e => {
    logger.error(e);
    process.exit(1);
  });
