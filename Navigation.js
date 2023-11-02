import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Homepage from './HomePage'
import LectureView from "./LectureView";
import ExerciseView from "./ExerciseView";

const Stack = createNativeStackNavigator();

/**
 * Allows client side navigation through of a stack navigator
 *
 * State:
 * none
 *
 * Props:
 * none
 */
function Navigation() {

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
        <Stack.Screen name="LectureView" component={LectureView} />
        <Stack.Screen name="ExerciseView" component={ExerciseView} />

      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default Navigation;