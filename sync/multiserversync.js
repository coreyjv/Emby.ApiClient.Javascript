
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['serversync'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./serversync'));
    } else {
        // Browser globals (root is window)
        root.multiserversync = factory(root.serversync);
    }
}(this, function (ServerSync) {
    'use strict';

    function syncNext(connectionManager, servers, index, options, resolve, reject) {

        var length = servers.length;

        if (index >= length) {

            resolve();
            return;
        }

        var server = servers[index];

        console.log("Creating ServerSync to server: " + server.Id);

        new ServerSync().sync(connectionManager, server, options).then(function () {

            syncNext(connectionManager, servers, index + 1, options, resolve, reject);

        }, function () {

            syncNext(connectionManager, servers, index + 1, options, resolve, reject);
        });
    }

    function MultiServerSync() {

    }

    MultiServerSync.prototype.sync = function (connectionManager, options) {

        return new Promise(function (resolve, reject) {

            var servers = connectionManager.getSavedServers();

            syncNext(connectionManager, servers, 0, options, resolve, reject);
        });
    };

    return MultiServerSync;
}));