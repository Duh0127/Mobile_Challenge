import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#100D28",
    paddingTop: 12,
    paddingBottom: 70,
    minHeight: "100%",
  },
  categories: {
    // backgroundColor: '#fff',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  scrollViewContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    height: 200,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 3,
  },
  promotion: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#d2d2d2",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#0002",
    borderWidth: 3,
  },
  modalImage: {
    width: 170,
    height: 170,
    objectFit: "contain",
  }
});
