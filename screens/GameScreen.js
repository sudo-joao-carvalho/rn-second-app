import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);

    //using useRef so the numbers survive components re-renders
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if(currentGuess === props.userChoice){
            setTimeout(() => {
                props.onGameOver(rounds);
            }, 1000);
        }
    }, [currentGuess, props.userChoice, props.onGameOver]);

    const nextGuessHanlder = direction => {
        if((direction === "LOWER" && currentGuess < props.userChoice) || direction === "GREATER" && currentGuess > props.userChoice){
            Alert.alert("Don't lie!", "You know this is wrong..."), [{ text: "Sorry!", style: "cancel" }];
            return;
        }

        if(direction === "LOWER"){
            currentHigh.current = currentGuess;
        }else if(direction === "GREATER"){
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, props.currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((previousState) => previousState + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>
                Opponent's Guess
            </Text>
            <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Card style={styles.buttonContainer}>
                    <Button 
                        title="LOWER"
                        onPress={nextGuessHanlder.bind(this, "LOWER")}
                    />
                    <Button 
                        title="GREATER"
                        onPress={nextGuessHanlder.bind(this, "GREATER")}
                    />
                </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%",
    }
});

export default GameScreen;