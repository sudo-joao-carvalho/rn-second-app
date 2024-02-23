import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: .26,
        backgroundColor: "white",
        borderRadius: 10,
    },
});

export default Card;