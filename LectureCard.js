import { Text, View, StyleSheet } from "react-native"


function LectureCard({title, description, staff, startAt}){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Title: {title}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Starts At: {startAt}</Text>
    </View>
  )
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

export default LectureCard