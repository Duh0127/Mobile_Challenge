import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  image: {
    // backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    height: 60,
    width: 60,
    objectFit: 'contain',
    borderRadius: 50,
  },
  text: {
    color: '#fff',
    fontSize: 13,
    textTransform: 'uppercase',
    marginTop: 8,
  }
});
