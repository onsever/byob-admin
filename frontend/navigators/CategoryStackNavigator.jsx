import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/category/CategoryScreen";
import EditCategoryScreen from "../screens/category/EditCategory";

const Stack = createNativeStackNavigator();

const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "" }}>
      <Stack.Group>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen
          name="EditCategoryScreen"
          component={EditCategoryScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default CategoryStackNavigator;
