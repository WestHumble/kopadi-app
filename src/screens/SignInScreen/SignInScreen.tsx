import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/Logo-Test.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const onSignInPressed = () => {
    console.warn("Kliknięto zalogowanie");
  };
  const onForgotPressed = () => {
    console.warn("Klikniecie zapomniałem hasła");
  };
  const onSignInFacebookPressed = () => {
    console.warn("Kliknięto zalogowanie facebook");
  };
  const onSignInGooglePressed = () => {
    console.warn("Kliknięto zalogowanie google");
  };
  const onCreateAccPressed = () => {
    console.warn("Założenie konta");
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={(styles.logo, { height: height * 0.3 })}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="Nazwa użytkownika"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Hasło"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <CustomButton text="Zaloguj" onPress={onSignInPressed} type="PRIMARY" />
      <CustomButton
        text="Zapomniałem hasła"
        onPress={onForgotPressed}
        type="TERTIARY"
      />
      <CustomButton
        text="Zaloguj się za pomocą Facebooka"
        onPress={onSignInFacebookPressed}
        bgColor={"#3b5998"}
        fgColor={"white"}
      />
      <CustomButton
        text="Zaloguj się za pomocą Google"
        onPress={onSignInGooglePressed}
        bgColor={"#db4437"}
        fgColor={"white"}
      />
      <CustomButton
        text="Nie mam konta - zarejestruj się"
        onPress={onCreateAccPressed}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
