import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { getPlans } from "../../database/db-functions";

import { Plan } from "../../utils/models";

const PlansList = ({ navigation }: any) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const loadPlans = useCallback(async () => {
    try {
      const storedPlans: any = await getPlans();
      console.log("Stored Plans ==> ", storedPlans);
      setPlans(storedPlans._array);
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
          plans.map((plan) => (
            <Text key={plan.id} style={styles.planItem}>
              {plan.title}
            </Text>
          ))
        ) : (
          <Text style={styles.plansEmpty}>NO PLANS YET</Text>
        )}
      </ScrollView>
      <View style={styles.optionContainer}>
        <TouchableHighlight onPress={() => navigation.navigate("Add Plan")}>
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
    minHeight: 450,
    marginTop: 20,
  },
  planContentContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  planItem: {
    width: "95%",
    padding: 10,
    color: "#f9f7f9",
    backgroundColor: "#1dbae3",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    borderRadius: 10,
  },
  plansEmpty: {
    color: "#f9f7f9",
    fontSize: 35,
    fontWeight: "bold",
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
  addButtonTouchable: {
    borderRadius: 10,
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
