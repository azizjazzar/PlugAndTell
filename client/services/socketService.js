import { io } from 'socket.io-client';
import clientLogger from '../../logService/clientLogger.js';

class SocketService {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.clientSocket = io(this.serverUrl);
    this.isConnected = false;
  }

  connect() {
    this.clientSocket.on('connect', () => {
      clientLogger.info(`Connected to the server at ${this.serverUrl}`);
      this.isConnected = true;
    });

    this.clientSocket.on('disconnect', () => {
      clientLogger.info('Disconnected from server');
      this.isConnected = false;
    });
  }

  sendData(event, data) {
    if (this.isConnected) {
      clientLogger.debug(`Sending data to server: ${event}`);
      this.clientSocket.emit(event, data);
    } else {
      clientLogger.warn('Server is not reachable. Data not sent.');
    }
  }

  disconnect() {
    clientLogger.info('Disconnecting from server...');
    this.clientSocket.disconnect();
  }
}

export default SocketService;
