import { StyleSheet, Text, View, Alert, FlatList, useWindowDimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Title from '../components/Title'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import InstructionText from '../components/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude){
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  if(rndNum===exclude){
    return generateRandomBetween(min, max, exclude);
  }else{
    return rndNum;
  }
}

//these are outside component function because we dont want them to be reset(re-initialized) every time the component function re renders
// but we want them to be reset, when the game restarts, hence to achieve this use useEffect
let minBoundary=1;
let maxBoundary=100;

const GameScreen = ({ userNumber, onGameOver}) => {
  //useState(initialGuess) only uses the initial value on the first render
  //On subsequent renders, React ignores the initial value parameter
  //The function still executes, but its result is discarded
  //thats why we need to hardcode the values (1,100,userNumber) so that upon everytime execution, it does not causes error when minBoundary and maxBoundary values keep changing 
  // because if minb=49, maxb=51 and userNumber=50 then will cause infinite loop problem at initialGuess=gRB(49,51,50) even when this value will not be used
  //hence use the hardcode
  const initialGuess=generateRandomBetween(1,100, userNumber);
  const [currentGuess, setCurrentGuess]=useState(initialGuess);
  //their are multiple rounds and we want to log number for every round
  const [guessRounds, setGuessRounds]= useState([initialGuess])
  const {width, height}= useWindowDimensions();

  useEffect(()=>{
    if(currentGuess === userNumber){
      onGameOver(guessRounds.length);
    }
    
  }, [currentGuess, userNumber]);//all the dependencies of use effect stored in this []

  //with empty dependency array, the function inside useEffect runs once, just after the initial render. not on multiple renders when updates occur to the screen(UI) being displayed
  useEffect(()=>{
    minBoundary=1
    maxBoundary=100
  },[])


  function nextGuessHandler(direction){
    if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber))
    {
      Alert.alert("Dont lie!", 'You know that this is wrong...',[
        { text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }

    if(direction === 'lower')//current guess is high, come low
    {
      maxBoundary = currentGuess;
    }else{
      minBoundary = currentGuess +1;//bcz min boundary included in random num range, unlike maxboundary
    }
    const newRndNumber= generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber)
    //storing every rounds guess
    //prevGuessRounds-->This represents the current state before the update — an array like [10, 23, 45].
    //This creates a new array where:
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
  }

  const guessRoundsListLength= guessRounds.length

   let content = 
  <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton whenPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="remove" size={24} color='white'/>
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton whenPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="add" size={24} color='white'/>
          </PrimaryButton>
        </View>
      </View>
    </Card>
  </>

  if(width > 500){
    content = (
      <>
        <InstructionText style={styles.instructionText}> Higher or lower</InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color='white'/>
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton whenPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color='white'/>
            </PrimaryButton>
          </View>
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screen}>
          <Title>Opponent's Guess</Title>
          {content}
          <View style={styles.listContainer}>
            <FlatList
              data={guessRounds}
              renderItem={(itemData) => (
                <GuessLogItem 
                  roundNumber={guessRoundsListLength - itemData.index} 
                  guess={itemData.item}
                />
              )}
              keyExtractor={(item) => item.toString()}
              scrollEnabled={false} // Disable nested scrolling
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    width: '100%',
    padding: 16
  }
})