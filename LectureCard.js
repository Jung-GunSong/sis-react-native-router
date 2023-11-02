import { Text, View, StyleSheet } from "react-native";
import SisApi from "./api";


function LectureCard({ title, description, staff, startAt }) {
  const startAtDate = new Date(startAt);
  const readableDate = startAtDate.toDateString();
  const readableTime = startAtDate.toLocaleTimeString();

  // TODO: api calls for staff?
  // let staffPromises = [];
  // staff.map(s => (
  //   SisApi.getStaffDetails(s)
  // ));


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Title: {title}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Date: {readableDate}</Text>
      <Text style={styles.text}>Time: {readableTime}</Text>
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
  },
});

export default LectureCard;