/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import socketHandlers from './socketServer';

const app: Application = express();
export const httpServer = createServer(app);

// Socket.IO configuration
export const io = new SocketServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketHandlers(io);

// Middlewares
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Hotlancer server with Socket.IO');
});

//@ts-ignore
app.use(globalErrorHandler);
app.use('*', notFoundRoute);

export default app;
