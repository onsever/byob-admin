import { useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { logout } from "../../redux/features/authSlice";

export default function EditDrinkScreen() {
    const { fetch, loading, loaded, result, error } = useFetch();

    useEffect(() => {
        fetch("menu/drink/all");
    }, [])

    return (
        <SafeAreaView>
            <Text>Edit Drink</Text>

        </SafeAreaView>
    );
}
