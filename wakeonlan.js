(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.wakeonlan = factory();
  }
}(this, function () {
    'use strict';

    function send(info) {

        return Promise.resolve();
    }

    return {
        send: send
    };
}));