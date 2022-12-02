import { TextInput, View, Text } from "react-native";
import tw from "twrnc";

const Input = ({
    inputStyles,
    viewStyles,
    placeholder,
    errorMessage,
    onAction = null,
    blurAction = null,
    focusAction = null,
    keyboardType,
    val,
    title,
    secure = false,
    iconLeft,
    iconRight,
}) => {
    return (
        <>
            {viewStyles ? (
                <>
                    <View
                        style={tw`flex items-start justify-start w-full h-[80px] ${errorMessage && val ? tw`mb-4` : tw`mb-0`
                            } ${viewStyles}`}
                    >
                        <Text style={tw`mb-1 text-black`}>{title}</Text>
                        <TextInput
                            style={tw`border border-[#C5C5C5] px-2 py-2 w-full rounded-md h-[43px] ${inputStyles}`}
                            placeholder={placeholder}
                            autoCorrect={false}
                            autoCapitalize={false}
                            autoFocus={false}
                            autoComplete={false}
                            keyboardType={keyboardType}
                            onChangeText={(text) => onAction(text)}
                            onBlur={blurAction}
                            value={val}
                            secureTextEntry={secure}
                        />
                        {val === "" ? (
                            <></>
                        ) : (
                            errorMessage && (
                                <Text style={tw`text-sm text-red-500 underline mt-1`}>
                                    {errorMessage}
                                </Text>
                            )
                        )}
                    </View>
                </>
            ) : (
                <>
                    <TextInput
                        style={tw`border border-[#C5C5C5] px-2 py-2 w-full rounded-md h-[43px] ${inputStyles}`}
                        placeholder={placeholder}
                        autoCorrect={false}
                        autoCapitalize={false}
                        autoFocus={false}
                        autoComplete={false}
                        keyboardType={keyboardType}
                        onChangeText={(text) => onAction(text)}
                        onBlur={blurAction}
                        value={val}
                        secureTextEntry={secure}
                    />
                    {val === "" ? (
                        <></>
                    ) : (
                        errorMessage && (
                            <Text style={tw`text-sm text-red-500 underline mt-1`}>
                                {errorMessage}
                            </Text>
                        )
                    )}
                </>
            )}
        </>
    );
};

export default Input;
