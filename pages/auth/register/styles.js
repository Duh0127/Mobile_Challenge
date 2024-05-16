import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#100D28",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 18,
  },
  title: {
    color: "#fff",
    fontSize: 48,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: "center",
  },
  login_box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#fff3",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 8,
  },
  button: {
    backgroundColor: "#593596",
    borderRadius: 8,
    marginTop: 16,
    width: "100%",
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  otheroptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 16,
    marginTop: 16,
  },
  title2: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  accounts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingBottom: 16,
  },
});
