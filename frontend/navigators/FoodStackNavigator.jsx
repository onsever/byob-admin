import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditFoodScreen from "../screens/food/EditFood";
import FoodScreen from "../screens/food/FoodScreen";

const Stack = createNativeStackNavigator();

const DrinkStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "" }}>
      <Stack.Group>
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="EditFoodScreen" component={EditFoodScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default DrinkStackNavigator;
