import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const initialLoginFormData = { username: "", password: "" };

function Login(){

  // const [loginData, setLoginData] = useState(initialLoginFormData);
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");

  // async function handleSubmit(evt) {
  //   evt.preventDefault();

  //   try {
  //     // await login(loginData);
  //     setLoginData(initialLoginFormData);
  //     navigate("/");
  //   } catch (err) {
  //     setErrors(err[0].message);
  //   }
  // }

  function handleSubmit(){
    console.warn('button has been pressed');
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username"
      style={styles.textInput}
      value={username}
      onChangeText={setUsername}
       />
      <Text>Please appear</Text>
    </View>
      // <TextInput placeholder="Password"
      //  style={styles.textInput}
      //  value={password}
      //  onChangeText={setPassword}
      //  secureTextEntry
      //   />
      //   <Pressable onPress={handleSubmit}>
      //     <Text style={styles.button}>Button</Text>
      //   </Pressable>

  );

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    minWidth:'100%'
  },

  textInput:{
    minWidth:'70%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 1,
  },

  button:{
    backgroundColor:'#3B71F3',
    minWidth:'70%',
    padding:5,
    marginVertical:5,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    color:'white',
  }
})

export default Login