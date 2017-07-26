(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.fileupload = factory();
  }
}(this, function () {
    'use strict';

    function FileUpload() {

    }

    FileUpload.prototype.upload = function (file, name, url) {

        return Promise.reject();
    };

    return FileUpload;
}));