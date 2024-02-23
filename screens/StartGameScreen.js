import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Colors from "../constants/colors";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const handleEnteredValue = input => {
        setEnteredValue(input.replace(/[^0-9]/g, ""));
    };

    const resetEnteredValue = () => {
        setEnteredValue("");
        setUserConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert("Invalid number!", "Number has to be a number between 1 and 99.", [{text: "Okay", style: "destructive", onPress: resetEnteredValue}])
            return;
        }

        setUserConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        //setSelectedNumber(parseInt(enteredValue)); //it can be done after de setEnteredValue("") bcs the function is queued and it only be done at the end of the function
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if(userConfirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button
                    title="START GAME"
                    onPress={() => props.onStartGame(selectedNumber)}
                />
            </Card>
        )
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card styles={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <Input 
                            style={styles.input}
                            blurOnSubmit
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={handleEnteredValue}
                            value={enteredValue}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button 
                                    title="Reset"
                                    color={Colors.accent}
                                    onPress={resetEnteredValue}
                                />
                            </View>
                            
                            <View style={styles.button}>
                                <Button 
                                    title="Confirm"
                                    color={Colors.primary}
                                    onPress={confirmInputHandler}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: "center",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

// shadow properties only work on iOS -> use elevation to Android

export default StartGameScreen;