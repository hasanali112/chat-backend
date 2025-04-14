/* eslint-disable no-console */
import mongoose from 'mongoose';
import { config } from './app/config';
import { httpServer, io } from './app'; // Modified import
import { seedingSuperAdmin } from './app/DB';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedingSuperAdmin();

    httpServer.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
      console.log(`Socket.IO ready at ws://localhost:${config.port}`);
    });

    // Socket.IO connection test
    io.on('connection', (socket) => {
      console.log('Socket.IO connection established:', socket.id);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();
