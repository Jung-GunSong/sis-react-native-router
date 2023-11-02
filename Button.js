import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";


/** Button: Reusable button
 *
 * Props:
 * - text: string
 * - onPress(): function when pressed
 */

function Button({ text, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f86161',
    minWidth: '100%',
    maxWidth: '100%',
    padding: 5,
    marginTop: 60,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 4,
    fontWeight: 'bold',
    color: 'white',
    overflow: 'hidden',
  },

});

export default Button;