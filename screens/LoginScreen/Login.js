import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView } from 'react-native';
import userContext from "../../userContext";


/** Login: Render username and password inputs and button.
 *
 * State
 * username: string
 * password: string
 */

function Login() {
  const { loginUser } = useContext(userContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    console.log('INSIDE HANDLE SUBMIT BUTTON LOGIN');

    try {
      await loginUser(username, password);
    }
    catch {
      console.warn('loginUser failed');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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

      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>Button</Text>
      </Pressable>
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
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 1,
    height: '5%',
  },

  button: {
    backgroundColor: '#3B71F3',
    minWidth: '70%',
    maxWidth: '70%',
    padding: 5,
    marginVertical: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default Login;