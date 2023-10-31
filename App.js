import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter} from "react-router-native";
import RouteList from './RouteList';

export default function App() {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <RouteList />
      </NativeRouter>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
