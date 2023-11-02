import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import SisApi from "./api";
import LectureCard from "./LectureCard";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

/** LectureView: See all lecture titles and schedule.
 */

function LectureView() {
  const [isLoading, setIsLoading] = useState(true);
  const [lectureData, setLectureData] = useState();
  const navigation = useNavigation();

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

      lectureDetailedData = await updateStaffDetails(lectureDetailedData)
      console.log(lectureDetailedData);
      setLectureData(lectureDetailedData);
      setIsLoading(false);
    }

    async function updateStaffDetails(lectureData){
      const allStaffData = await SisApi.getAllStaff();

      const staffDirectory= {};

      console.log(`data from all staff fetch is`,allStaffData);
      allStaffData.forEach( (staff) => staffDirectory[staff.api_url] = staff.full_name);
      console.log(`our staff directory is`, staffDirectory);
      for (let lecture of lectureData){
        for (let staffUrl of lecture.staff){
          if (staffDirectory[staffUrl]){
            staffUrl = staffDirectory[staffUrl];
          }
        }
      }

      return lectureData

    }

    fetchLectures();

  }, []);

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
        <Text style={styles.text}>All Lectures</Text>

        <Button
          onPress={homepagePress}
          text="Home"
          style={styles.button} />

        <View>
          <Text style={styles.text}>Upcoming Lecture:</Text>
          <LectureCard
            title={futureLectures[0].title}
            description={futureLectures[0].description}
            startAt={futureLectures[0].start_at}
            staff={futureLectures[0].staff}
          />
        </View>

        <View>
          {futureLectures.slice(1).length > 0 &&
            <Text style={styles.text}>Future Lectures:</Text>}

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
            <Text style={styles.text}>Past Lectures:</Text>}

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
    marginVertical: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    color: 'white',
  },
});


export default LectureView;

/**
 * Start by retrieving all staff from cohort
 * set Staff state to res.results
 * map through lectureData, if url in l.staff === staff.api_url,
 * then return staff.full_name
 * cards will have full names,
 *
 *
 */