//TODO ES6: This needs to be fixed.
import appSettings from 'appSettings';
import connectionManager from '../connectionmanager';
import MultiServerSync from './multiserversync';

let isSyncing;

export default {
  sync(options) {
    console.log('localSync.sync starting...');

    if (isSyncing) {
      return Promise.resolve();
    }

    isSyncing = true;

    return new Promise((resolve, reject) => {
      options = options || {};

      options.cameraUploadServers = appSettings.cameraUploadServers();

      new MultiServerSync().sync(connectionManager, options).then(
        () => {
          isSyncing = null;
          resolve();
        },
        err => {
          isSyncing = null;
          reject(err);
        }
      );
    });
  }
};
