import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import tw from "twrnc";

export default function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View>
        <Text>HomeScreen</Text>
        <TouchableOpacity
          style={{ backgroundColor: "pink", padding: 10 }}
          onPress={() => dispatch(logout())}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
        <View style={tw`mt-5`}>
          <Text style={tw`text-center text-bold text-10`}>Select a Table</Text>
        </View>
        <ScrollView style={tw`p-7 mb-30`}>
          <View style={tw`flex flex-row justify-between mb-10`}>
            {/* Table 1 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image source={require("../../assets/chair.png")} />
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 w-30 h-20 flex justify-center items-center`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                >
                  <Text>1</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>

            {/* Table 2 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-40`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-44.92deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "44.92deg" }] }}
                />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 flex justify-center items-center rounded-full h-20 w-20`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-7 w-7 flex items-center justify-center`}
                >
                  <Text>2</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-40`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-130.47deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "130.47deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`flex flex-row justify-between mb-10`}>
            {/* Table 3 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex items-center justify-center w-30`}>
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-90deg" }] }}
                />
                <View
                  style={tw`border-1 border-black bg-gray-300 w-20 h-20 flex justify-center items-center`}
                >
                  <View
                    style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                  >
                    <Text>3</Text>
                  </View>
                </View>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>

              <View style={tw`flex items-center justify-center w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>

            {/* Table 4 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image source={require("../../assets/chair.png")} />
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 w-30 h-20 flex justify-center items-center`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                >
                  <Text>4</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`flex flex-row justify-between mb-10`}>
            {/* Table 5 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image source={require("../../assets/chair.png")} />
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 w-30 h-20 flex justify-center items-center`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                >
                  <Text>5</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>

            {/* Table 6 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-40`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-44.92deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "44.92deg" }] }}
                />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 flex justify-center items-center rounded-full h-20 w-20`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-7 w-7 flex items-center justify-center`}
                >
                  <Text>6</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-40`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-130.47deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "130.47deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`flex flex-row justify-between mb-10`}>
            {/* Table 7 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex items-center justify-center w-30`}>
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "-90deg" }] }}
                />
                <View
                  style={tw`border-1 border-black bg-gray-300 w-20 h-20 flex justify-center items-center`}
                >
                  <View
                    style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                  >
                    <Text>7</Text>
                  </View>
                </View>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>

              <View style={tw`flex items-center justify-center w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>
            {/* Table 8 */}
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image source={require("../../assets/chair.png")} />
                <Image source={require("../../assets/chair.png")} />
              </View>
              <View
                style={tw`border-1 border-black bg-gray-300 w-30 h-20 flex justify-center items-center`}
              >
                <View
                  style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
                >
                  <Text>8</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between w-30`}>
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Image
                  source={require("../../assets/chair.png")}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
