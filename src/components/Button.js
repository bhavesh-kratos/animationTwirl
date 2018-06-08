import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FadeInView from './ButtonAnimation';

class AppButton extends Component {
    render() {
        const { text, onPress, extStyle } = this.props;
        return (
            <TouchableOpacity style={[styles.buttonStyle, extStyle]}
                onPress={() => onPress()}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center',
    },

    buttonStyle: {
        paddingVertical: 10,
        backgroundColor: '#50C878',
        borderRadius: 5,
        zIndex: 1000,
    }
});

export default AppButton;