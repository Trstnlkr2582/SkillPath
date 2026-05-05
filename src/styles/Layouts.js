import { StyleSheet} from 'react-native';

export const basic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertical centering
    alignItems: 'center',     // Horizontal centering
  },
  title1: {
    fontFamily: "sans-serif",
    color: "#075343",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center"
  },
  title2: {
    fontFamily: "sans-serif",
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center"
  }
});
