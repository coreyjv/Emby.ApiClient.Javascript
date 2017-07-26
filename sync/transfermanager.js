
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['filerepository'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./filerepository'));
    } else {
        // Browser globals (root is window)
        root.transfermanager = factory(root.filerepository);
    }
}(this, function (filerepository) {
    'use strict';

    function downloadFile(url, folderName, localPath) {

        return Promise.resolve();
    }

    function downloadSubtitles(url, folderName, localItem) {

        return Promise.resolve('');
    }

    function downloadImage(url, folderName, serverId, itemId, imageTag) {
        return Promise.resolve(false);
    }

    return {
        downloadFile: downloadFile,
        downloadSubtitles: downloadSubtitles,
        downloadImage: downloadImage
    };
}));