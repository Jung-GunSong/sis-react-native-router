import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Homepage from "./Homepage";
import userContext from "./userContext";

const Stack = createNativeStackNavigator();

function Navigation() {
  const { token } = useContext(userContext);
  console.log("token in nav", token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#ffff',
        }
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Homepage" component={Homepage} />

      </Stack.Navigator>
    </NavigationContainer>
  );

}

// const styles = StyleSheet.create({
//   screen: {
//     minWidth:'70%'
//   },
// });

export default Navigation;