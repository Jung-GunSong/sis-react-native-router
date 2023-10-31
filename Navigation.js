import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen/Login';

const Stack = createNativeStackNavigator();

function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#ffff',
          } }}>
        <Stack.Screen name="Login" component={Login} />

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