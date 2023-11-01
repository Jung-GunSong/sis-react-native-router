import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import userContext from "./userContext";
import { useContext } from "react";
import Button from "./Button";


/** Homepage to render after successful login. */

function Homepage() {
  const { user } = useContext(userContext);
  const navigation = useNavigation()

  function lecturePress() {
    navigation.navigate('LectureView');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>

      <Button onPress={lecturePress} text="Lectures" style={styles.button}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '70%',
    minWidth: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  text: {
    minWidth: '70%',
    alignSelf: 'center',
  },

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

export default Homepage;