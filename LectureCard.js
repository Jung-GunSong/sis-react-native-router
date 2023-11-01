import { Text, View, StyleSheet } from "react-native"


function LectureCard({title, description, staff, startAt}){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Title: {title}</Text>
      <Text style={styles.text}>Description:{description}</Text>
      <Text style={styles.text}>Starts At: {startAt}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '70%',
    minWidth: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
  },

  text: {
    minWidth: '50%',
    maxWidth: '70%',
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

export default LectureCard