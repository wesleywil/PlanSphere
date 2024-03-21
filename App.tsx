import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/homeScreen/homeScreen";
import PlansList from "./screens/plansList/plansList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plans List" component={PlansList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
