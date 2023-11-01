import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Navigation from './Navigation';
import { useState } from 'react';
import SisApi from './api';
import userContext from "./userContext";

/** App: Renders navigation for entire app.  */
export default function App() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");

  /** Logs a user in */
  async function loginUser(username, password) {
    console.log("inside loginUser of app")
    const resToken = await SisApi.login(username, password);
    console.log(`Our token is`, resToken);
    // localStorage.setItem("token", resToken);

    if (resToken) {
      SisApi.token = resToken;
      setToken(resToken);
      setUser(username);
    };
  }

  return (
    <userContext.Provider value={{ loginUser, token }}>
      <Navigation />
    </userContext.Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth:'100%'
//   },
// });
