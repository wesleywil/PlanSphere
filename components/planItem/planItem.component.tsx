import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Plan } from "../../utils/models";

type PlanItemProps = {
  navigation: NavigationProp<any, any>;
  plan: Plan;
};

const PlanItem = ({ plan, navigation }: PlanItemProps) => {
  return (
    <View style={styles.planItem} key={plan.id}>
      <TouchableHighlight
        style={styles.btnOptions}
        onPress={() => navigation.navigate("Update Plan", { id: plan.id! })}
      >
        <Text style={styles.btnOptionText}>Update</Text>
      </TouchableHighlight>
      <Text style={styles.planItemText}>{plan.title}</Text>
      <TouchableHighlight
        style={styles.btnOptions}
        onPress={() => navigation.navigate("Delete Plan", { id: plan.id! })}
      >
        <Text style={styles.btnOptionText}>Delete</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PlanItem;

const styles = StyleSheet.create({
  planItem: {
    width: "95%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    color: "#f9f7f9",
    backgroundColor: "#1dbae3",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    borderRadius: 10,
  },
  btnOptions: {
    backgroundColor: "#f9f7f9",
    borderRadius: 5,
  },
  btnOptionText: {
    paddingTop: 7,
    padding: 5,
    fontSize: 15,
  },
  planItemText: {
    padding: 5,
    color: "#f9f7f9",
    fontSize: 20,
    fontWeight: "bold",
  },
});
