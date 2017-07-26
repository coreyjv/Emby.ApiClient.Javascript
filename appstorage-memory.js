﻿(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.appstorage = factory();
  }
}(this, function () {
    'use strict';

    function MyStore() {

        this.localData = {};
    }

    MyStore.prototype.setItem = function (name, value) {
        this.localData[name] = value;
    };

    MyStore.prototype.getItem = function (name) {
        return this.localData[name];
    };

    MyStore.prototype.removeItem = function (name) {
        this.localData[name] = null;
    };

    return new MyStore();
}));