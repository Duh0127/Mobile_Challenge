import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#100D28",
    paddingTop: 12,
    paddingBottom: 70,
    minHeight: "100%",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 32,
  },
  scrollViewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 24,
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  titleCategories: {
    color: "#fff",
    fontSize: 14,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  selectedCategory: {
    color: "#fff",
    fontSize: 14,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#593596",
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
  },
});
