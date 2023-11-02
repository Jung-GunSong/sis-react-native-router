import { View, Text, StyleSheet } from "react-native";

/** ExerciseCard: Render card with information about an exercise.
 *
 * Props:
 * - title: string
 * - description: string
 */

function ExerciseCard({title, description}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>Description: {description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '90%',
    minWidth: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  text: {
    padding: 6,
    fontSize: 15,
  },
  title: {
    fontWeight: 'bold',
    padding: 6,
    fontSize: 25,
  }
});
export default ExerciseCard