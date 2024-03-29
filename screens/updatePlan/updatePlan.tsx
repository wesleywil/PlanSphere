import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Button,
} from "react-native";
import { getPlanById, updatePlanById } from "../../database/db-functions";
import { Plan } from "../../utils/models";

const UpdatePlan = ({ route, navigation }: any) => {
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

  const handleTitleChange = (text: string) => {
    setPlan({ ...plan, title: text });
  };

  const handlePriorityChange = (text: string) => {
    setPlan({ ...plan, priority: text });
  };

  const handleNoteChange = (text: string) => {
    setPlan({ ...plan, note: text });
  };

  const updatePlan = async () => {
    try {
      const result = await updatePlanById(plan);
      console.log("Updating plan result ==> ", result);
    } catch (error) {
      console.error("Error while trying to update a plan: ", error);
    }
  };

  useEffect(() => {
    if (loading) {
      selectPlan();
    }
  }, [plan]);
  return (
    <View style={styles.container}>
      <TextInput
        value={plan.title}
        style={styles.input}
        placeholder="Plan Title"
        onChangeText={handleTitleChange}
      />
      <TextInput
        value={plan.priority}
        style={styles.input}
        placeholder="Plan Priority"
        onChangeText={handlePriorityChange}
      />
      <TextInput
        value={plan.note}
        style={styles.input}
        placeholder="Extra Note"
        onChangeText={handleNoteChange}
      />
      {/* <TextInput
        value={plan.limit_date as unknown as string}
        style={styles.input}
        placeholder="Limit Date ex: 02/12/2025"
      /> */}
      <Button title="UPDATE PLAN" color="#1dbae3" onPress={updatePlan} />
    </View>
  );
};

export default UpdatePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#28336b",
  },
  input: {
    width: "95%",
    paddingHorizontal: 10,
    fontSize: 30,
    color: "#28336b",
    backgroundColor: "#f9f7f9",
    borderWidth: 1,
    borderColor: "#f9f7f9",
    borderRadius: 5,
  },
});
