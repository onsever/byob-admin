import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrinkScreen from "../screens/drink/DrinkScreen";
import EditDrinkScreen from "../screens/drink/EditDrink";

const Stack = createNativeStackNavigator();

const DrinkStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="DrinkScreen"
          component={DrinkScreen}
        />
        <Stack.Screen
          name="EditDrinkScreen"
          component={EditDrinkScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default DrinkStackNavigator;
