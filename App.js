import { View, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';


// Prevent the splash screen from auto-hiding
//i)
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)
  // ii)
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  // iii)
  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        await fontsLoaded;
      } catch (e) {
        console.warn(e);
      } finally {
        // Set app as ready to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  // iv)
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  
  function gameOverHandler(numberOfRounds) {
    setGuessRounds(numberOfRounds)
    setGameIsOver(true)
  }

  function startNewGameHandler(){
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>;
  }

  //V)
  if (!appIsReady || !fontsLoaded) {
    return null; // Return null while preparing the app
  }

  return (
    <>
      <StatusBar style='light'/>
      <LinearGradient 
        colors={[Colors.primary700, Colors.accent500]} 
        style={styles.rootScreen}
        onLayout={onLayoutRootView}
      >
        <ImageBackground 
          source={require('./assets/images/background.png')} 
          resizeMode='cover' 
          style={styles.rootScreen}
          imageStyle={styles.imageBackground}
        >
          <SafeAreaProvider style={styles.rootScreen}>{screen}</SafeAreaProvider>
        </ImageBackground>
      </LinearGradient>
    </>
    
  );
}


const styles=StyleSheet.create({
  rootScreen:{
    flex:1,
  },
  imageBackground:{
    opacity:0.15,
  }
})

