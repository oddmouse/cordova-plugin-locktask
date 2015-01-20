# LockTask

A Cordova plugin that provides access to Android’s screen pinning APIs.

## Installation
LockTask will only work on Android devices for apps targeting Lollipop (API 21) or above.

Navigate to your project root and run:
```sh
cordova plugin add https://github.com/livesure/cordova-plugin-locktask.git
```

## Usage

### startLockTask

- **successCallback:** [Function optional] - success callback
- **errorCallback:** [Function(error) optional] - error callback, error message string is passed
- **className:** [String optional] - DeviceAdminReceiver subclass name if device owner is enabled

```js
window.plugins.locktask.startLockTask(successCallback, errorCallback, className);
```

### stopLockTask

- **successCallback:** [Function optional] - success callback
- **errorCallback:** [Function(error) optional] - error callback, error message string is passed

```js
window.plugins.locktask.startLockTask(successCallback, errorCallback);
```

## Device admin
If the app is not set up as the device owner, the user will have to accept a prompt when ```startLockTask``` is called. The user will also be able to unpin the screen with a navigation button combination. With device owner set, there is no prompt and only the app itself can unpin the screen.

*IMPORTANT: Once set, you cannot unset device owner or uninstall the app without factory resetting the device.*

There are several ways to set device owner but this is the method that worked for me.

1. Enable Developer options on the device by repeatedly tapping ```Build number``` under ```Settings > About Tablet```.
1. Check the USB debugging option under ```Settings > Developer options```.
1. Add a device admin sub class of DeviceAdminReceiver.
    ```java
    package com.exapmle.package;
    import android.app.admin.DeviceAdminReceiver;
    public class DeviceAdminExample extends DeviceAdminReceiver {
      // Some code here if you want but not necessary
    }
    ```
1. Add a receiver to ```AndroidManifest.xml``` directly below ```</activity>```.
    ```xml
    <receiver android:label="@string/app_name" android:name="DeviceAdminExample" android:permission="android.permission.BIND_DEVICE_ADMIN">
      <meta-data android:name="android.app.device_admin" android:resource="@xml/device_admin" />
      <intent-filter>
        <action android:name="android.app.action.DEVICE_ADMIN_ENABLED" />
      </intent-filter>
    </receiver>
    ```
1. Connect device via USB.
1. Install the app to the device.
1. Use Android Debug Bridge and Device Policy Manager to set device owner.
    ```sh
    adb shell
    dpm set-device-owner com.exapmle.package/.DeviceAdminExample
    ```
1. All done!
