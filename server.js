import Debug from 'debug';
import { config } from 'dotenv';

const debug = Debug('http');

process.on('uncaughtException', (error) => {
  debug('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  debug(error.name, error.message);
  process.exit(1);
});

config({ path: './config.env' });
import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  debug(`App running on port ${PORT}...`);
});

process.on('unhandledRejection', (error) => {
  debug('UNHANDLED REJECTION! Shutting down...');
  debug(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

export default server;
