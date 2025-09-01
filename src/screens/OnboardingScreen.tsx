import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ItalianaText } from '../components/ItalianaText';
import { InterText } from '../components/InterText';

interface OnboardingScreenProps {
  navigation: any;
}

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  // Try to use local image first, fallback to URL if not available
  const getImageSource = () => {
    try {
      return require('../../assets/images/onboarding-v2.png');
    } catch (e) {
      // Fallback to a beautiful cosmetic products image that matches your attached image
      return { uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=280&h=420&fit=crop&auto=format&q=80' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E8B4B8" />

      <View style={styles.content}>
        {/* Main Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImageSource()}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Branding */}
        <View style={styles.brandContainer}>
          <ItalianaText style={styles.brandTitle} color="#FFFFFF">
            Viorra
          </ItalianaText>
          <InterText variant="large" color="#FFFFFF" style={styles.tagline}>
            Your Beauty, Delivered.
          </InterText>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <InterText variant="medium" style={styles.getStartedText}>
            Get Started
          </InterText>
        </TouchableOpacity>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8B4B8',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  productImage: {
    width: 280,
    height: 420,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  brandTitle: {
    fontSize: 56,
    lineHeight: 72,
  },
  tagline: {
    width: '100%',
    textAlign: 'center',
    marginTop: 8,
  },
  getStartedButton: {
    backgroundColor: '#B84953',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginBottom: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: 160,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  progressFill: {
    width: 90,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});
