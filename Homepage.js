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
      <Text style={styles.item}>Welcome!</Text>

      <Button onPress={lecturePress} text="Lectures" style={styles.item}/>

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

  item: {
    minWidth: '70%',
    alignSelf: 'center',
  }
});

export default Homepage;