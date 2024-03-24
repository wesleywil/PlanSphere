import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/homeScreen/homeScreen";
import PlansList from "./screens/plansList/plansList";
import AddPlan from "./screens/addPlan";

// Database
import DatabaseInit from "./database/db-service";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const database = new DatabaseInit();
    console.log("initialize database!");
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plans List" component={PlansList} />
        <Stack.Screen name="Add Plan" component={AddPlan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
