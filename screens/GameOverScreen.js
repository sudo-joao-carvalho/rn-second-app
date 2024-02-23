import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>
                The Game is Over
            </Text>
            <Text>Rounds to guess: {props.numberOfRounds}</Text>
            <Text>Number was: {props.winNumber}</Text>
            <Button title="NEW GAME" onPress={props.configureNewGame}/>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default GameOverScreen;