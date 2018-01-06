import MediaSync from './mediasync';
import ContentUploader from './contentuploader';

function performSync(connectionManager, server, options) {
  console.log(`ServerSync.performSync to server: ${server.Id}`);

  options = options || {};

  let uploadPhotos = options.uploadPhotos !== false;

  if (
    options.cameraUploadServers &&
    !options.cameraUploadServers.includes(server.Id)
  ) {
    uploadPhotos = false;
  }

  const promise = uploadPhotos
    ? uploadContent(connectionManager, server, options)
    : Promise.resolve();

  return promise.then(() => syncMedia(connectionManager, server, options));
}

function uploadContent(connectionManager, server, options) {
  return new Promise((resolve, reject) => {
    const uploader = new ContentUploader();
    uploader.uploadImages(connectionManager, server).then(resolve, reject);
  });
}

function syncMedia(connectionManager, server, options) {
  return new Promise((resolve, reject) => {
    const apiClient = connectionManager.getApiClient(server.Id);

    new MediaSync().sync(apiClient, server, options).then(resolve, reject);
  });
}

class ServerSync {
  sync(connectionManager, server, options) {
    if (!server.AccessToken && !server.ExchangeToken) {
      console.log(
        `Skipping sync to server ${
          server.Id
        } because there is no saved authentication information.`
      );
      return Promise.resolve();
    }

    const connectionOptions = {
      updateDateLastAccessed: false,
      enableWebSocket: false,
      reportCapabilities: false,
      enableAutomaticBitrateDetection: false
    };

    return connectionManager.connectToServer(server, connectionOptions).then(
      ({ State }) => {
        if (State === MediaBrowser.ConnectionState.SignedIn) {
          return performSync(connectionManager, server, options);
        } else {
          console.log(`Unable to connect to server id: ${server.Id}`);
          return Promise.reject();
        }
      },
      err => {
        console.log(`Unable to connect to server id: ${server.Id}`);
        throw err;
      }
    );
  }
}

export default ServerSync;
