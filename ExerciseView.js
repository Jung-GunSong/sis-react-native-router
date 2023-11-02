import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import SisApi from "./api";
import ExerciseCard from "./ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

/** ExerciseView: See all list of exercises organized by most recent
 * exercise, then by future exercises and past exercises
 *
 * State:
 * -isLoading: boolean
 * -exerciseData: array
 *
 * Props:
 * none
 */

function ExerciseView() {
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState();
  const navigation = useNavigation();

  /**
   * Uses api to collect all data on all lectures in the cohort
   * then changes staff data to the full names of all staff
   * involved in each lecture
   *
   */
  useEffect(function fetchExercisesWhenMounted() {
    async function fetchExercises() {
      const allExercises = await SisApi.getExercises();
      const exercisePromises = [];

      allExercises.map(e => exercisePromises.push(SisApi.getExercise(e.api_url)));

      let exerciseDetailedData = await Promise.all(exercisePromises);

      console.log("exercisedetaileddata", exerciseDetailedData);
      setExerciseData(exerciseDetailedData);
      setIsLoading(false);
    }

    fetchExercises();

  }, []);

  // Navigates to the homepage upon press
  function homepagePress() {
    navigation.navigate('Homepage');
  }

  if (isLoading === true) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        <Button
          onPress={homepagePress}
          text="Home"
          style={styles.button} />

        <View>
          {exerciseData.length > 0 &&
            <Text style={styles.textHeader}>All Exercises:</Text>}

          {exerciseData &&
            exerciseData.map(e => (
              <ExerciseCard
                title={e.title}
                description={e.description} />
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    minWidth: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  text: {
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#f86161',
    minWidth: '70%',
    maxWidth: '70%',
    padding: 5,
    marginVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    color: 'white',
  },

  textHeader: {
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 6,
    fontSize: 20,
  }
});


export default ExerciseView;