import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';

const initialLoginFormData = { username: "", password: "" };

function Login(){

  const [loginData, setLoginData] = useState(initialLoginFormData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(l => ({ ...l, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      // await login(loginData);
      setLoginData(initialLoginFormData);
      navigate("/");
    } catch (err) {
      setErrors(err[0].message);
    }
  }

  return (
    <View>
      <TextInput placeholder="Username" style={styles.container} />
      <TextInput placeholder="Password" style={styles.container} />
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    width: '500px',
    borderColor: '#808080',
    borderWidth: 5,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },

  // input:{
  //   marginVertical: 20,
  //   paddingHorizontal: 10,
  // }
})

export default Login