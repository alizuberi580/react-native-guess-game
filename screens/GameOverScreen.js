import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from '../components/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';



const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {
  const {width, height} = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 425) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.rootContainer}>
          <Title>GAME OVER!</Title>
          <View style={[styles.imageContainer, imageStyle]}>
            <Image 
              source={require('../assets/images/success.png')} 
              style={styles.image}
            />
          </View>
          <Text style={styles.summaryText}>
            Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
            guess the number <Text style={styles.highlight}>{userNumber}</Text>  
          </Text>
          <PrimaryButton whenPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  rootContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%' // Ensures content takes at least full height
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  }
});

export default GameOverScreen;