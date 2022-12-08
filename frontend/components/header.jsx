import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
// import { colors } from "../constants/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Header = ({ title, search, logout, onSearch, back, onBack }) => {

    const logoutHandler = () => { };

    return (
        <View style={styles.wrapper} >
            <TouchableOpacity style={styles.iconWrapper} onPress={search ? onSearch : back ? onBack : null}>
                {search && <Ionicons name="search" size={30} color="grey" />}
                {back && <Ionicons name="chevron-back" size={30} color="grey" />}
            </TouchableOpacity>
            <View style={tw`shadow-lg shadow-black`}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.iconWrapper} onPress={logout ? logoutHandler : null}>
                {logout && <Ionicons name="log-out" size={30} />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        // backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 24,
        bottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconWrapper: {
        // backgroundColor: 'red',
        padding: 10,
        minWidth: 55
    }
});