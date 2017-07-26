(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.cameraroll = factory();
  }
}(this, function () {
    'use strict';

    function CameraRoll() {

    }

    CameraRoll.prototype.getFiles = function () {

        return Promise.resolve([]);
    };

    return new CameraRoll();
}));