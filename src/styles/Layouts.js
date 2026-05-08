import { Platform, StyleSheet } from 'react-native';

export const basic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontFamily: "Inter_800ExtraBold",
    color: "#075343",
    fontSize: Platform.OS != "web" ? 32 : 36,
    textAlign: "center"
  },
  title2: {
    fontFamily: "Inter_600SemiBold",
    color: "black",
    fontSize: Platform.OS != "web" ? 24 : 28,
    textAlign: "center",
    padding: Platform.OS != "web" ? 18 : 20,
    paddingTop: Platform.OS != "web" ? 0 : 20
  },
  text: {
    fontFamily: "Inter_400Regular",
    color: "#3F4945",
    fontSize: Platform.OS != "web" ? 15 : 18,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  bottomText: {
    position: "absolute",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#707975",
    textAlign: "center",
    justifyContent: "flex-end",
    paddingBottom: Platform.OS != "web" ? 30 : 30,
    paddingHorizontal: 30
  },
  icon: {
    height: 22,
    width: 22,
    margin: 10,
  },
  button: {
    backgroundColor: "#2A6B5A",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: "center",
    margin: 5
  },
  buttonAlt: {
    backgroundColor: "#A7E9D30d",
    borderWidth: 3,
    borderColor: "#075343",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: "center",
    margin: 5
  },
  separator: {
    borderRadius: 5,
    marginVertical: Platform.OS != "web" ? 16 : 30,
    height: 2,
    width: "70%",
    borderWidth: 2,
    borderColor: "#d3d3d3"
  },
  modal: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#BFC9C4",
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#BFC9C4",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
  },
  rawText: {
    fontFamily: "Inter_400Regular"
  },
  rawBoldText: {
    fontFamily: "Inter_700Bold"
  },
  rawMedium: {
    fontFamily: "Inter_500Medium"
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: Platform.OS !== "web" ? 11 : 12,
    color: "#075343",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#707975",
  },
});
