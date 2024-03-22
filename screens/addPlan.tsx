import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { getDBConnection, savePlan } from "../database/db-service";
import { Plans } from "../utils/models";

const stringToDate = (dateString: string | null): Date | undefined => {
  if (typeof dateString === "string") {
    let time: number = Date.parse(dateString!);
    let res: Date = new Date(time);
    return res;
  }
  return undefined;
};

const AddPlan = () => {
  const [plan, setPlan] = useState<Plans>({} as Plans);

  const handleTitleChange = (text: string) => {
    setPlan({ ...plan, title: text });
  };

  const handlePriorityChange = (text: string) => {
    setPlan({ ...plan, priority: text });
  };

  const handleNoteChange = (text: string) => {
    setPlan({ ...plan, note: text });
  };

  const handleDateChange = (text: string) => {
    // Assuming toDateString() is a custom function to format the date
    setPlan({ ...plan, limit_date: stringToDate(text) });
  };

  const handleAddPlan = async () => {
    try {
      console.log("1");
      const db = await getDBConnection();
      console.log(db);
      //   const result = await savePlan(db, plan);
      //   console.log("Result=> ", result);
      //   console.log("PLANS: ", plan);
    } catch (error) {
      console.error("Error while trying to add a new plan: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={plan.title}
        placeholder="Plan Title"
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.input}
        value={plan.priority}
        placeholder="Plan Priority"
        onChangeText={handlePriorityChange}
      />
      <TextInput
        style={styles.input}
        value={plan.note}
        placeholder="Extra Note"
        onChangeText={handleNoteChange}
      />
      {/* <TextInput
        style={styles.input}
        value={plan.limit_date ? plan.limit_date.toString() : ""}
        placeholder="Date Limit For Plan"
        onChangeText={handleDateChange}
      /> */}
      <Button title="ADD PLAN" color="#1dbae3" onPress={handleAddPlan} />
    </View>
  );
};

export default AddPlan;

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