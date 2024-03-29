import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { deletePlanById, getPlanById } from "../../database/db-functions";
import { Plan } from "../../utils/models";

const DeletePlan = ({ route, navigation }: any) => {
  const [plan, setPlan] = useState<Plan>({} as Plan);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  const selectPlan = async () => {
    console.log("PLAN ID==> ", id);
    const plan = await getPlanById(id);
    console.log("PLAN ==> ", plan);
    setPlan(plan!);
    setLoading(false);
  };

  const deletePlan = async () => {
    const plan = await deletePlanById(id);
    console.log("DELETE PLAN RETURN ==> ", plan);
    navigation.navigate("Plans List");
  };

  useEffect(() => {
    if (loading) {
      selectPlan();
    }
  }, [plan]);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.deleteText}>
          ARE YOU SURE YOU WANT TO DELETE "{plan.title}" PLAN?
        </Text>
        <View style={styles.containerOptions}>
          <Button title="YES" onPress={deletePlan} color="#FF6C6C" />
          <Button
            title="NO"
            onPress={() => navigation.navigate("Plans List")}
            color="#1dbae3"
          />
        </View>
      </View>
    </View>
  );
};

export default DeletePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#28336b",
  },
  subContainer: {
    maxWidth: "90%",
    maxHeight: "32%",
    padding: 20,
    flex: 1,
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#f9f7f9",
    borderRadius: 10,
  },
  deleteText: {
    marginBottom: 10,
    color: "#28336b",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerOptions: {
    flex: 1,
    gap: 20,
  },
});
