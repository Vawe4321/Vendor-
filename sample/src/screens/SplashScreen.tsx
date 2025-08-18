import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const dot1Opacity = useRef(new Animated.Value(1)).current;
  const dot2Opacity = useRef(new Animated.Value(0.7)).current;
  const dot3Opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.7,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.7,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.7,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateDots());
    };

    animateDots();
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Groosologowithname.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Loading Animation */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Grooso</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light gray background like the logo description
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logo: {
    width: Math.min(width * 0.7, 350), // 70% of screen width, max 350px
    height: Math.min(height * 0.25, 180), // 25% of screen height, max 180px
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981', // Green color matching Grooso brand
    marginHorizontal: 4,
    opacity: 0.3,
  },

  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
});

export default SplashScreen; 