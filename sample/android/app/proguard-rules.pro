# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# React Native Vector Icons
-keep class com.oblador.vectoricons.** { *; }

# React Native Image Picker
-keep class com.imagepicker.** { *; }
-keep class com.reactnative.ivpusic.imagepicker.** { *; }

# React Native Permissions
-keep class com.zoontek.rnpermissions.** { *; }

# React Native Device Info
-keep class com.learnium.RNDeviceInfo.** { *; }

# React Native Async Storage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# React Native NetInfo
-keep class com.reactnativecommunity.netinfo.** { *; }

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.swmansion.reanimated.** { *; }

# React Native Screens
-keep class com.swmansion.rnscreens.** { *; }

# React Native Safe Area Context
-keep class com.th3rdwave.safeareacontext.** { *; }

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# React Native Linear Gradient
-keep class com.BV.LinearGradient.** { *; }

# React Native Push Notification
-keep class com.dieam.reactnativepushnotification.** { *; }

# React Native Date Picker
-keep class io.github.henninghall.date_picker.** { *; }

# React Native Modal
-keep class com.reactnativecommunity.rnmodal.** { *; }

# Redux and related
-keep class com.reduxjs.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# Chart Kit and MPAndroidChart
-keep class com.github.mikephil.charting.** { *; }
-keep class com.github.wuxudong.rncharts.** { *; }

# QR Code SVG
-keep class org.devio.rn.splashscreen.** { *; }

# Firebase (for push notifications)
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# OkHttp and networking
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# Fresco (React Native image handling)
-keep class com.facebook.fresco.** { *; }
-keep class com.facebook.imagepipeline.** { *; }

# General Android and support library
-keep class androidx.** { *; }
-keep class android.support.** { *; }

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep Serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Suppress warnings
-dontwarn com.facebook.react.**
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn javax.annotation.**
-dontwarn sun.misc.Unsafe
