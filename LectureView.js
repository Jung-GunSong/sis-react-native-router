import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
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
    console.log("useeffect running lectureview")
    async function fetchLectures() {
      const allLectures = await SisApi.getLectures();

      console.log("all Lectures", allLectures);


      const lecturePromises = [];
      allLectures.map(l => lecturePromises.push(SisApi.getLecture(l.id)));
      console.log("lecturePromises", lecturePromises);
      const lectureDetailedData = await Promise.all(lecturePromises);
      console.log("lectureDetailedData", lectureDetailedData);
      setLectureData(lectureDetailedData);
      setIsLoading(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button onPress={homepagePress} text="Home" style={styles.button} />
        <Text style={styles.text}>LectureView</Text>
        {lectureData &&
          lectureData.map(l => (<LectureCard
            key={l.id}
            title={l.title}
            description={l.description}
            startAt={l.start_at}
            staff={l.staff} />))}
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