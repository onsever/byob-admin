import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../screens/user/UserScreen";
import OrderHistoryScreen from "../screens/user/OrderHistoryScreen";

const Stack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "" }}>
      <Stack.Group>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
