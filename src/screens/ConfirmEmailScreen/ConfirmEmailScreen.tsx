import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const onRegisterPressed = () => {
    console.warn("Kliknięto rejestrację");
  };
  const onResendPressed = () => {
    console.warn("Kliknięto wyślij ponownie");
  };
  const onPrivatePolicyPressed = () => {
    console.warn("Kliknięto politykę prywatności");
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={[styles.root, { height: height * 1 }]}>
      <View style={styles.windowTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title} resizeMode="contain">
            Potwierdź swój adres e-mail
          </Text>
          <View style={styles.inputArea}>
           <Text style={styles.text}>
            Wysłaliśmy Ci link potwierdzający na adres e-mail. Kliknij w link, aby potwierdzić swój adres e-mail. Jeśli nie otrzymałeś e-maila, sprawdź folder ze spamem.
          </Text>
          <CustomButton
            text="Cofnięcie do logowania"
            onPress={onBackToLoginPressed}
            type="TERTIARY"
            bgColor={undefined}
            fgColor={undefined}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#131417",
    flex: 1,
  },
  windowTab: {
    height: "92%",
    width: "100%",
    backgroundColor: "#1D1F24",
    top: "7%",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 25,
  },
  link: {
    color: "#003f63",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "15%",
    marginBottom: 20,
    color: "#ffffff",
  },
  inputEmail: {
    color: "#ffffff",
  },
  inputArea: {
    marginVertical: 20,
  },
  

});

export default ConfirmEmailScreen;
