import { createApp } from './app';
import { environment } from './config/environment';
import { pool, closePool } from './database/pool';

/**
 * Start the HTTP server
 */
async function startServer(): Promise<void> {
  try {
    // Test database connection
    const client = await pool.connect();
    console.log('Database connection established');
    client.release();

    // Create and start Express app
    const app = createApp();
    const server = app.listen(environment.port, () => {
      console.log(`Server running on port ${environment.port}`);
      console.log(`Environment: ${environment.nodeEnv}`);
      console.log(`Health check: http://localhost:${environment.port}/health`);
      console.log(`API endpoint: http://localhost:${environment.port}/api/todos`);
    });

    // Graceful shutdown
    const shutdown = async (): Promise<void> => {
      console.log('Shutting down gracefully...');

      // Close HTTP server and wait for it
      await new Promise<void>((resolve) => {
        server.close(() => {
          console.log('HTTP server closed');
          resolve();
        });
      });

      // Close database pool
      await closePool();

      // Exit process
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
