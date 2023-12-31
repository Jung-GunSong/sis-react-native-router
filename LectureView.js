import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import SisApi from "./api";
import LectureCard from "./LectureCard";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

/** LectureView: See all list of lectures organized by most recent
 * lecture, then by future lectures and past lectures
 *
 * State:
 * -isLoading: boolean
 * -lectureData: array
 *
 * Props:
 * none
 */

function LectureView() {
  const [isLoading, setIsLoading] = useState(true);
  const [lectureData, setLectureData] = useState();
  const navigation = useNavigation();

  /**
   * Uses api to collect all data on all lectures in the cohort
   * then changes staff data to the full names of all staff
   * involved in each lecture
   *
   */
  useEffect(function fetchLecturesWhenMounted() {
    async function fetchLectures() {
      const allLectures = await SisApi.getLectures();
      const lecturePromises = [];

      allLectures.map(l => lecturePromises.push(SisApi.getLecture(l.id)));

      let lectureDetailedData = await Promise.all(lecturePromises);

      lectureDetailedData = lectureDetailedData.sort(function (a, b) {
        return (a.start_at < b.start_at) ?
          -1 :
          ((a.start_at > b.start_at) ?
            1 :
            0);
      });

      lectureDetailedData = await updateStaffDetails(lectureDetailedData);
      console.log("after update staff", lectureDetailedData);
      setLectureData(lectureDetailedData);
      setIsLoading(false);
    }
    /**
     * takes lecture data and edits staff data
     * to replace urls with that staff's full name
     */
    async function updateStaffDetails(lectureData) {
      const allStaffData = await SisApi.getAllStaff();

      const staffDirectory = {};

      console.log(`data from all staff fetch is`, allStaffData);
      allStaffData.forEach((staff) => staffDirectory[staff.api_url] = staff.full_name);
      console.log(`our staff directory is`, staffDirectory);

      for (let lecture of lectureData) {

        for (let i = 0; i < lecture.staff.length; i++) {
          let staffUrl = lecture.staff[i];
          if (staffDirectory[staffUrl]) {
            lecture.staff[i] = staffDirectory[staffUrl];
          }
        }
      }

      return lectureData;
    }

    fetchLectures();

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

  const futureLectures = lectureData.filter(l => new Date() < new Date(l.start_at));
  const pastLectures = lectureData.filter(l => new Date() > new Date(l.start_at));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          onPress={homepagePress}
          text="Home"
          style={styles.button} />

        <View>
          <Text style={styles.textHeader}>Upcoming Lecture:</Text>
          <LectureCard
            title={futureLectures[0].title}
            description={futureLectures[0].description}
            startAt={futureLectures[0].start_at}
            staff={futureLectures[0].staff}
          />
        </View>

        <View>
          {futureLectures.slice(1).length > 0 &&
            <Text style={styles.textHeader}>Future Lectures:</Text>}

          {lectureData &&
            futureLectures
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
          {pastLectures.length > 0 &&
            <Text style={styles.textHeader}>Past Lectures:</Text>}

          {lectureData &&
            pastLectures.map(l => (
              <LectureCard
                key={l.id}
                title={l.title}
                description={l.description}
                startAt={l.start_at}
                staff={l.staff} />
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


export default LectureView;