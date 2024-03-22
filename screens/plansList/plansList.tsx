import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  createTable,
  getDBConnection,
  getPlans,
} from "../../database/db-service";
import { Plans } from "../../utils/models";

const PlansList = () => {
  const [plans, setPlans] = useState<Plans[]>([]);
  const loadPlans = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedPlans = await getPlans(db);
      setPlans(storedPlans);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.plansContainer}
        contentContainerStyle={styles.planContentContainer}
      >
        {plans.length ? (
          plans.map((plan) => <Text style={styles.planItem}>{plan.title}</Text>)
        ) : (
          <Text>NO PLANS YET</Text>
        )}
      </ScrollView>
      <View style={styles.optionContainer}>
        <TouchableHighlight onPress={() => console.log("Nothing to do")}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableHighlight>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default PlansList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#28336b",
    alignItems: "center",
  },
  title: {
    color: "#f9f7f9",
    fontSize: 50,
    fontWeight: "600",
    borderBottomWidth: 2,
    borderBottomColor: "#1dbae3",
  },
  plansContainer: {
    width: "100%",
    maxHeight: "80%",
    marginTop: 20,
  },
  planContentContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
  planItem: {
    width: "90%",
    padding: 10,
    color: "#f9f7f9",
    textAlign: "center",
    fontSize: 25,
    borderWidth: 2,
    borderColor: "#1dbae3",
    borderRadius: 10,
  },
  optionContainer: {
    width: "100%",
    minHeight: 10,
    marginTop: 5,
    padding: 15,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopWidth: 2,
    borderColor: "#1dbae3",
  },
  addButton: {
    width: 45,
    height: 45,
  },
  addButtonText: {
    minWidth: 45,
    minHeight: 45,
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    color: "#f9f7f9",
    backgroundColor: "#1dbae3",
    borderRadius: 10,
  },
});
