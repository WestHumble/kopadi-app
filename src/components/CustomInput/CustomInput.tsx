import {View, TextInput, StyleSheet, Platform} from "react-native";
import React from "react";

const CustomInput = ({
    value,
    setValue,
    placeholder,
    secureTextEntry,
    additionalStyle,
    editable = true,
    inputType = "text", // Domyślnie ustawiamy na "text"
}) => {
    return (
        <View style={[styles.container, additionalStyle]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                editable={editable}
                style={[
                    styles.input,
                    additionalStyle,
                    inputType === "textArea" && styles.textArea,
                ]}
                placeholderTextColor="#f9f9f9"
                multiline={inputType === "textArea"}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#131417",
        paddingHorizontal: 10,
        marginVertical: 5,
        backgroundColor: "#131417",
        width: "100%",
        color: "#fff",
    },
    input: {
        height: 60,
        ...Platform.select({
            ios: {
                // Dodatkowe style dla iOS
            },
            android: {
                // Dodatkowe style dla Androida
            },
        }),
    },
    textArea: {
        height: 120,
    },
});

export default CustomInput;
