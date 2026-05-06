import { StyleSheet} from 'react-native';

export const basic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontFamily: "Inter_800ExtraBold",
    color: "#075343",
    fontSize: 36,
    textAlign: "center"
  },
  title2: {
    fontFamily: "Inter_600SemiBold",
    color: "black",
    fontSize: 28,
    textAlign: "center",
    padding: 25,
  },
  text: {
    fontFamily: "Inter_400Regular",
    color: "#3F4945",
    fontSize: 18,
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
    height: 10,
    paddingBottom: 70,
    paddingHorizontal: 30
  },
  icon:{
    height:22,
    width:22,
    margin: 10,
  },
  button:{
    width: "70%",
    backgroundColor: "#2A6B5A",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical:10,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: "center",
    margin: 5
  },
  buttonAlt:{
    width: "70%",
    backgroundColor: "#A7E9D30d",
    borderWidth: 3,
    borderColor: "#075343",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical:10,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: "center",
    margin: 5
  },
  separator: {
    marginVertical: 30,
    height:2,
    width: "70%",
    borderWidth: 2,
    borderColor: "#d3d3d3"
  },
  modal: {
    borderRadius:7,
    borderWidth: 2,
    borderColor: "#BFC9C4",
    backgroundColor: "white",
    width: "100%",
    height: "70%",
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
});
