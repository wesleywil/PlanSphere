import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require("../../assets/logo.jpg")}
      />
      <View style={styles.optionContainer}>
        <TouchableHighlight
          style={styles.navTouch}
          onPress={() => navigation.navigate("Plans List")}
        >
          <Text style={styles.navButtonText}>PLANS</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navTouch}
          onPress={() => navigation.navigate("Add Plan")}
        >
          <Text style={styles.navButtonText}>ADD PLAN</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28336b",
  },
  logoImage: {
    width: 300,
    height: 300,
  },
  optionContainer: {
    width: "90%",
    maxHeight: 180,
    flex: 1,
    justifyContent: "center",
    gap: 30,
  },
  navTouch: {
    backgroundColor: "#1dbae3",
    borderRadius: 5,
  },
  navButtonText: {
    padding: 10,
    color: "#f9f7f9",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
