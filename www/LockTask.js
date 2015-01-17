module.exports = {
  startLockTask: function (successCallback, errorCallback, adminClassName) {
    if (adminClassName == null) {
      adminClassName = '';
    }
    cordova.exec(successCallback, errorCallback, "LockTask", "startLockTask", [adminClassName]);
  },
  stopLockTask: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "LockTask", "stopLockTask", []);
  }
};
