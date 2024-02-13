import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/Logo-Test.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ping } from "../../components/Api/pingAuth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const { login, logout, isLoading, userToken } = useContext(AuthContext);

  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    login(email, password)
  };
  const onForgotPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onCreateAccPressed = () => {
    navigation.navigate("SignUp");
  };

  const onPingPressed = async () => {
    console.log(await ping())
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.3 })}
          resizeMode="contain"
        />
        <Text>{userToken ? "logged in :>" : "logged out :<"}</Text>
        <CustomInput
          placeholder="Podaj adres e-mail"
          value={email}
          setValue={setEmail}
          secureTextEntry={undefined}
        />
        <CustomInput
          placeholder="Hasło"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton
          text="Zaloguj"
          onPress={onSignInPressed}
          type="PRIMARY"
          bgColor={undefined}
          fgColor={undefined}
        />
        <CustomButton text="Wyloguj" onPress={logout} type="PRIMARY" />
        <CustomButton text="Ping" onPress={onPingPressed} type="PRIMARY" />

        <CustomButton
          text="Zapomniałem hasła"
          onPress={onForgotPressed}
          type="TERTIARY"
          bgColor={undefined}
          fgColor={undefined}
        />
        <SocialSignInButtons />
        <CustomButton
          text="Nie mam konta - zarejestruj się"
          onPress={onCreateAccPressed}
          type="TERTIARY"
          bgColor={undefined}
          fgColor={undefined}
        />
      </View>
    </ScrollView>
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
