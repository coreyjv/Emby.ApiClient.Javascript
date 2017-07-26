
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['appSettings','connectionManager'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('appSettings'), require('../connectionManager'));
    } else {
        // Browser globals (root is window)
        root.localsync = factory(root.appSettings, root.connectionManager);
    }
}(this, function (appSettings, connectionManager) {
    'use strict';

    var syncPromise;

    return {

        sync: function (options) {

            if (syncPromise) {
                return syncPromise;
            }

            return new Promise(function (resolve, reject) {

                require(['multiserversync'], function (MultiServerSync) {

                    options = options || {};

                    options.cameraUploadServers = appSettings.cameraUploadServers();

                    syncPromise = new MultiServerSync().sync(connectionManager, options).then(function () {

                        syncPromise = null;
                        resolve();

                    }, function () {

                        syncPromise = null;
                        reject();
                    });
                });

            });
        }
    };

}));
