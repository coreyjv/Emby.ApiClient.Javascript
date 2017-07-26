(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.serverdiscovery = factory();
  }
}(this, function () {
    'use strict';

    return {

        findServers: function (timeoutMs) {

            // Expected server properties
            // Name, Id, Address, EndpointAddress (optional)
            return Promise.resolve([]);
        }
    };
}));