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
        source={{ uri: "https://dummyimage.com/300x300" }}
      />
      <TouchableHighlight
        style={styles.navTouch}
        onPress={() => navigation.navigate("Plans List")}
      >
        <Text style={styles.navButtonText}>Go to Plans List</Text>
      </TouchableHighlight>
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
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  navTouch: {
    marginTop: 20,
  },
  navButtonText: {
    padding: 10,
    color: "#f9f7f9",
    backgroundColor: "#1dbae3",
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 5,
  },
});
