import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import SisApi from "./api";
import LectureCard from "./LectureCard";

/** LectureView: See all lecture titles and schedule.
 */

function LectureView() {
  const [isLoading, setIsLoading] = useState(true);
  const [lectureData, setLectureData] = useState();

  useEffect(function fetchLecturesWhenMounted() {
    async function fetchLectures() {
      // await lectures
      // fetch from api/lecturessessions
      // want array from results key
      // want to dynamically generate lecture views for each object
      //run map where we run api calls on each id
      // use promise.all() to get new objects for each leacture
      // set lectureData to this result
      // map lecature Data to create LectureCard components
      const initialLectureData = await SisApi.getLectures()
      // console.log(`initial lecture data is`, initialLectureData);
      const promiseArray = [];
      initialLectureData.map(l => promiseArray.push(SisApi.getLecture(l.id)));
      const lectureDetailedData = await Promise.all(promiseArray);
      // console.log(`our detailed lecture data is`, lectureDetailedData);
      setLectureData(lectureDetailedData);
      setIsLoading(false);
    }

    fetchLectures();

  }, []);

  if (isLoading === true) {
    return (
      <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
    )
  }

  console.log(`lectureData is `, lectureData);
  return (
    <SafeAreaView style={styles.container}>
      <Text>LectureView</Text>
      {lectureData &&
      lectureData.map(l => (<LectureCard
      key={l.id}
      title={l.title}
      description={l.description}
      startAt={l.start_at}
      staff={l.staff} />))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '70%',
    minWidth: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  textInput: {
    minWidth: '100%',
    maxWidth: '100%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 1,
    height: '5%',
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
  }
});


export default LectureView;