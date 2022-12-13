import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import ProfileStackNavigator from "./ProfileStackNavigator";
import DrinkStackNavigator from "./DrinkStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Drink") {
            iconName = focused ? "beer" : "beer-outline";
          } else if (route.name === "Food") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "Category") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: Colors.frenchGray,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.secondary,
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeStackNavigator} /> */}
      {/* <Tab.Screen name="Cart" component={CartStackNavigator} /> */}
      <Tab.Screen name="Drink" component={DrinkStackNavigator} />
      <Tab.Screen name="Food" component={ProfileStackNavigator} />
      <Tab.Screen name="Category" component={ProfileStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
