import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import userContext from "./userContext";
import { useContext } from "react";


/** Homepage to render after successful login. */

function HomePage() {

  const { user } = useContext(userContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Homepage</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '70%',
    minWidth: '70%',
    alignSelf: 'center',
    justifyContent: 'center',

  },
})

export default HomePage;