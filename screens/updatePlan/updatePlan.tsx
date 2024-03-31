import { Picker } from "@react-native-picker/picker";
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

// Database functions
import { getPlanById, updatePlanById } from "../../database/db-functions";
// Models/Interface
import { Plan, Priority } from "../../utils/models";

const UpdatePlan = ({ route, navigation }: any) => {
  const [plan, setPlan] = useState<Plan>({} as Plan);
  const [loading, setLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState<Priority>();
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

  const handlePriorityChange = (priority: Priority) => {
    setPlan({ ...plan, priority: priority });
    setSelectedPriority(priority);
  };

  const handleNoteChange = (text: string) => {
    setPlan({ ...plan, note: text });
  };

  const updatePlan = async () => {
    try {
      const result = await updatePlanById(plan);
      console.log("Updating plan result ==> ", result);
      navigation.navigate("Plans List");
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
      <Picker
        selectedValue={selectedPriority}
        onValueChange={(itemValue, itemIndex) =>
          handlePriorityChange(itemValue)
        }
        style={styles.input}
      >
        <Picker.Item
          label={Priority.No_Priority}
          value={Priority.No_Priority}
          style={styles.selectItem}
        />
        <Picker.Item
          label={Priority.High}
          value={Priority.High}
          style={styles.selectItem}
        />
        <Picker.Item
          label={Priority.Mid}
          value={Priority.Mid}
          style={styles.selectItem}
        />
        <Picker.Item
          label={Priority.Low}
          value={Priority.Low}
          style={styles.selectItem}
        />
      </Picker>
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
  selectItem: {
    fontSize: 25,
  },
});
