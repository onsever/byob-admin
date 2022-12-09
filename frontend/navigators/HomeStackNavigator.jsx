import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/home/DetailsScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PaymentScreen from "../screens/checkout/PaymentScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
