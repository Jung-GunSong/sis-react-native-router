import { Text, View, StyleSheet } from "react-native";

/** LectureCard: Reusable card to display lecture details.
 *
 * Props:
 * - title: string
 * - description: string
 * - staff: array of strings
 * - startAt: ISO date string
 *
 * LectureView -> LectureCard
 */

function LectureCard({ title, description, staff, startAt }) {
  const startAtDate = new Date(startAt);
  const readableDate = startAtDate.toDateString();
  const readableTime = startAtDate.toLocaleTimeString();
  const staffNames = staff.join(", ")

  return (

    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Date: {readableDate}</Text>
      <Text style={styles.text}>Time: {readableTime}</Text>
      <Text style={styles.text}>Staff: {staffNames}</Text>
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

export default LectureCard;