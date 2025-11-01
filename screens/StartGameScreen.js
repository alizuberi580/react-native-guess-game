import {    StyleSheet, 
            Text, 
            View, 
            TextInput, 
            Alert, 
            useWindowDimensions, 
            KeyboardAvoidingView, 
            ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import Colors from '../constants/colors';
import Title from '../components/Title';
import Card from '../components/Card';
import InstructionText from '../components/InstructionText';
const StartGameScreen = (props) => {
    const [enteredNumber, setEnteredNumber] = useState('')

    //hook tends to check, whenever device display height/width changes, update height/width acccordingly
    const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetHandler(){
        setEnteredNumber('')
    }
    function confirmInputHandler(){
        const chosenNumber=parseInt(enteredNumber)
        if(Number.isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99){
            Alert.alert(
                'Invalid Number!',
                'Number has to be between 0 and 99.',
                [{text:'Okay', style:'destructive', onPress:resetHandler}]
            );
            return;
        }
        props.onPickNumber(chosenNumber)
    }

    const marginTopDistance = height < 450 ? 30 : 100 

    return (
        <ScrollView style={styles.keyboardView}>
            <KeyboardAvoidingView style={styles.keyboardView} behavior='position'>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <View style={[styles.rootContainer, {marginTop:marginTopDistance}]}>
                        <Title>Guess My Number</Title>
                        <Card>
                            <InstructionText>Enter a Number</InstructionText>
                            <TextInput 
                            style={styles.numberInput} 
                            maxLength={2}
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='number-pad'
                            onChangeText={numberInputHandler}
                            value={enteredNumber}/>
                            <View style={styles.buttonsContainer}>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton whenPress={resetHandler}>Reset</PrimaryButton>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton whenPress={confirmInputHandler}>Confirm</PrimaryButton>
                                </View>
                            </View>
                        </Card>
                    </View> 
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

//const deviceHeight = Dimensions.get('window').height;
//code outside of StartGamexScreen fucntion executes only one time on 1st rendering 
const styles = StyleSheet.create({
    keyboardView:{
        flex: 1
    },
    safeAreaContainer:{
        flex:1
    },
    rootContainer:{
        flex: 1,
        //marginTop:deviceHeight<450 ? 40 : 100,
        alignItems: 'center'
    },
    numberInput:{
        height:57,
        width:50,
        fontSize: 32,
        borderBottomColor:Colors.accent500,
        borderBottomWidth:2,
        color:Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign:'center'
    },
    buttonsContainer:{
        flexDirection:'row',
        
    },
    buttonContainer:{
        flex:1
    }
})