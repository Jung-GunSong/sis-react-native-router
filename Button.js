import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";


/** Button: Reusable button */
function Button({text, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f86161',
    minWidth: '70%',
    maxWidth: '70%',
    padding: 5,
    marginVertical: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Button;