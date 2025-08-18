@echo off
echo Fixing Android Emulator Configuration for Software Rendering...
echo.

REM Backup original config
copy "%USERPROFILE%\.android\avd\Pixel_8.avd\config.ini" "%USERPROFILE%\.android\avd\Pixel_8.avd\config.ini.backup" >nul 2>&1

REM Create temporary config with software rendering
(
echo AvdId=Pixel_8
echo PlayStore.enabled=true
echo abi.type=x86_64
echo avd.ini.displayname=Pixel 8
echo avd.ini.encoding=UTF-8
echo disk.dataPartition.size=6G
echo fastboot.chosenSnapshotFile=
echo fastboot.forceChosenSnapshotBoot=no
echo fastboot.forceColdBoot=no
echo fastboot.forceFastBoot=yes
echo hw.accelerometer=yes
echo hw.arc=false
echo hw.audioInput=yes
echo hw.battery=yes
echo hw.camera.back=virtualscene
echo hw.camera.front=emulated
echo hw.cpu.arch=x86_64
echo hw.cpu.ncore=2
echo hw.dPad=no
echo hw.device.hash2=MD5:ee8be881199234b0fdfcba2f33290f5e
echo hw.device.manufacturer=Google
echo hw.device.name=pixel_8
echo hw.gps=yes
echo hw.gpu.enabled=yes
echo hw.gpu.mode=swiftshader_indirect
echo hw.gyroscope=yes
echo hw.initialOrientation=portrait
echo hw.keyboard=yes
echo hw.lcd.density=420
echo hw.lcd.height=2400
echo hw.lcd.width=1080
echo hw.mainKeys=no
echo hw.ramSize=1536
echo hw.sdCard=yes
echo hw.sensors.light=yes
echo hw.sensors.magnetic_field=yes
echo hw.sensors.orientation=yes
echo hw.sensors.pressure=yes
echo hw.sensors.proximity=yes
echo hw.trackBall=no
echo image.sysdir.1=system-images\android-34\default\x86_64\
echo runtime.network.latency=none
echo runtime.network.speed=full
echo sdcard.size=512M
echo showDeviceFrame=yes
echo skin.dynamic=yes
echo skin.name=pixel_8
echo tag.display=Default Android System Image
echo tag.id=default
echo target=android-34
echo vm.heapSize=256
) > "%USERPROFILE%\.android\avd\Pixel_8.avd\config.ini"

echo.
echo ✅ AVD configuration updated for software rendering
echo ✅ Reduced CPU cores from 4 to 2 for better compatibility
echo ✅ Reduced RAM from 2GB to 1.5GB for stability
echo ✅ Set GPU mode to swiftshader_indirect
echo.
echo Now try launching your emulator with:
echo react-native run-android
echo.
pause