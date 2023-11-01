import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

/** LectureView: See all lecture titles and schedule.
 */

function LectureView() {
  const [isLoading, setIsloading] = useState(true);
  const [lectureData, setLectureData] = useState();

  useEffect(function fetchLecturesWhenMounted() {
    async function fetchLectures() {
      // await lectures
    }

    fetchLectures();
    setIsloading(false);
  });

  if (isLoading === true) {
    return (
      <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>LectureView</Text>
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