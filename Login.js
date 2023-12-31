import { useContext, useState } from "react";
import { StyleSheet, TextInput, SafeAreaView, Text } from 'react-native';
import userContext from "./userContext";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

/** Login: Render username and password inputs and login button.
 *
 * State
 * username: string
 * password: string
 *
 * Props:
 * none
 *
 *
 *
 *
 */

function Login() {
  const { loginUser } = useContext(userContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation()

  // attempts to login user and redirect to homepage
  //if unable to, will instead issue warning that
  //login failed
  async function handleSubmit() {

    try {
      await loginUser(username, password);
      navigation.navigate('Homepage');
    }
    catch {
      console.warn('loginUser failed');
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{`{R} Rithm School`}</Text>

      <TextInput placeholder="Username"
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput placeholder="Password"
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button text="Login" onPress={handleSubmit}/>

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

  textInput: {
    minWidth: '100%',
    maxWidth: '100%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 1,
    height: 50,
    marginBottom: 10,
  },

  header: {
    fontWeight: '100',
    fontSize: 25,
    fontFamily: 'serif',
    alignSelf: 'center',
    marginBottom: 60,
  },
});

export default Login;