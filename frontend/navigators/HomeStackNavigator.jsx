import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/home/DetailsScreen";
import HomeScreen from "../screens/home/HomeScreen";

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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
