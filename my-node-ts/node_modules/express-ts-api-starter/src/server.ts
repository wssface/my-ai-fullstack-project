import app from "./app";
import { env } from "./config/envConfig";
import {
  EServerStartMessages,
  EUncaughtExceptionMessages,
  EUnhandledRejectionMessages,
  EGracefulShutdownMessages,
} from "./messages";

// Handle uncaught exceptions
process.on(EUncaughtExceptionMessages.uncaughtException, (err) => {
  console.error(
    EUncaughtExceptionMessages.uncaughtExceptionMessage,
    err.message,
  );
  console.error(err.stack);
  process.exit(1);
});

const PORT = env.PORT;
const server = app.listen(PORT, () => {
  console.info(`${EServerStartMessages.serverStarted}`);
  console.log(`${EServerStartMessages.serverRunning}${PORT} ✅`);
});

// Handle unhandled promise rejections (async errors)
process.on(EUnhandledRejectionMessages.unhandledRejection, (reason: any) => {
  console.error(EUnhandledRejectionMessages.unhandledRejectionMessage, reason);
  gracefulShutdown();
});

// ===== Graceful Shutdown Handler =====
const gracefulShutdown = () => {
  console.log(`\n${EGracefulShutdownMessages.shutdownInitiated}`);

  // Set a timeout for shutdown (30 seconds)
  const shutdownTimeout = setTimeout(() => {
    console.warn(EGracefulShutdownMessages.shutdownTimeout);
    process.exit(1);
  }, 30000);

  // Stop accepting new connections
  server.close(() => {
    console.log(EGracefulShutdownMessages.serverClosed);
    clearTimeout(shutdownTimeout);
    console.log(EGracefulShutdownMessages.connectionsClosed);
    process.exit(0);
  });

  // Force exit after timeout
  shutdownTimeout.unref();
};

// Handle termination signals for graceful shutdown
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
