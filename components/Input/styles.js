import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 2,
    fontSize: 15,
    fontWeight: '600',
  },    
  input: {
    width: '100%',
    color: '#fff',
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 12,
    color: '#000',
  },
  placeholder: {
    color: '#000',
  }
});
