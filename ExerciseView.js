import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import SisApi from "./api";
import LectureCard from "./LectureCard";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

/** ExerciseView: See all list of lectures organized by most recent
 * lecture, then by future lectures and past lectures
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

      allExercises.map(l => exercisePromises.push(SisApi.getExercise(l.api_url)));

      let exerciseDetailedData = await Promise.all(exercisePromises);

      exerciseDetailedData = exerciseDetailedData.sort(function (a, b) {
        return (a.start_at < b.start_at) ?
          -1 :
          ((a.start_at > b.start_at) ?
            1 :
            0);
      });

      // exerciseDetailedData = await updateStaffDetails(exerciseDetailedData);
      console.log("after update staff", exerciseDetailedData);
      setExerciseData(exerciseDetailedData);
      setIsLoading(false);
    }
    /**
     * takes lecture data and edits staff data
     * to replace urls with that staff's full name
     */
    // async function updateStaffDetails(exerciseData) {
    //   const allStaffData = await SisApi.getAllStaff();

    //   const staffDirectory = {};

    //   console.log(`data from all staff fetch is`, allStaffData);
    //   allStaffData.forEach((staff) => staffDirectory[staff.api_url] = staff.full_name);
    //   console.log(`our staff directory is`, staffDirectory);

    //   for (let exercise of exerciseData) {

    //     for (let i = 0; i < exercise.staff.length; i++) {
    //       let staffUrl = exercise.staff[i];
    //       if (staffDirectory[staffUrl]) {
    //         exercise.staff[i] = staffDirectory[staffUrl];
    //       }
    //     }
    //   }

    //   return exerciseData;
    // }

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

  const futureExercises = exerciseData.filter(l => new Date() < new Date(l.start_at));
  const pastExercises = exerciseData.filter(l => new Date() > new Date(l.start_at));

  return (
    <SafeAreaView style={styles.container}>
      <Text>You made it to exerciseview</Text>
      {/* <ScrollView>
        <Button
          onPress={homepagePress}
          text="Home"
          style={styles.button} />

        <View>
          <Text style={styles.textHeader}>Upcoming Lecture:</Text>
          <LectureCard
            title={futureExercises[0].title}
            description={futureExercises[0].description}
            startAt={futureExercises[0].start_at}
            staff={futureExercises[0].staff}
          />
        </View>

        <View>
          {futureExercises.slice(1).length > 0 &&
            <Text style={styles.textHeader}>Future Lectures:</Text>}

          {exerciseData &&
            futureExercises
              .slice(1)
              .map(l => (
                <LectureCard
                  key={l.id}
                  title={l.title}
                  description={l.description}
                  startAt={l.start_at}
                  staff={l.staff} />
              ))}
        </View>

        <View>
          {pastExercises.length > 0 &&
            <Text style={styles.textHeader}>Past Lectures:</Text>}

          {exerciseData &&
            pastExercises.map(l => (
              <LectureCard
                key={l.id}
                title={l.title}
                description={l.description}
                startAt={l.start_at}
                staff={l.staff} />
            ))}
        </View>

      </ScrollView> */}
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


export default ExerciseView