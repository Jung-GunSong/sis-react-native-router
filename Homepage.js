import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import userContext from "./userContext";
import { useContext } from "react";
import Button from "./Button";

/** Homepage to render after successful login.
 *
 * State:
 * none
 *
 * Props:
 * user:string
 */

  function Homepage() {
  const { user } = useContext(userContext);
  const navigation = useNavigation();


  //Navigates to the lecture view upon press
  function lecturePress() {
    navigation.navigate('LectureView');
  }
  //Navigates to the exercise view upon press
  function exercisePress() {
    navigation.navigate('ExerciseView');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome {user}!</Text>

      <Button onPress={lecturePress} text="Lectures"/>
      <Button onPress={exercisePress} text="Exercises"/>


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
    fontSize: 20,
    alignSelf: 'center'
  },

});

export default Homepage;