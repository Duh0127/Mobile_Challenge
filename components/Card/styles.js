import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#392571',
    shadowColor: '#fff',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 160,
  },
  image: {
    height: 80,
    width: 100,
    objectFit: 'contain',
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 8,
  }
});
