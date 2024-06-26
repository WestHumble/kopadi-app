import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, {useEffect, useState} from "react";
import Logo from "../../../assets/images/LOGOTYP.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../../context/LocationContext";
import { ApiContext } from "../../context/ApiContext";

const SignInScreen = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    login(email, password);
  };
  const onForgotPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onCreateAccPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={[styles.root, { height: height }]}>
      <View style={styles.windowTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <CustomInput
            placeholder="Podaj adres e-mail"
            value={email}
            setValue={setEmail}
            secureTextEntry={undefined}
            additionalStyle={styles.inputEmail}
          />
          <CustomInput
            placeholder="Hasło"
            value={password}
            setValue={setPassword}
            secureTextEntry
            additionalStyle={styles.inputPassword}
          />
          <View style={{ height: 20 }}></View>
          <CustomButton
            text="Zaloguj"
            onPress={onSignInPressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
            additionalStyle={styles.inputLogin}
          />
          <CustomButton
            text="Zapomniałem hasła"
            onPress={onForgotPressed}
            type="TERTIARY"
            bgColor={undefined}
            fgColor={undefined}
            additionalStyles={{
              marginTop: 20,
              height: 30,
            }}
          />
          <CustomButton
            text="Nie mam konta - zarejestruj się"
            onPress={onCreateAccPressed}
            type="TERTIARY"
            bgColor={undefined}
            fgColor={undefined}
            additionalStyles={{
              height: 30,
            }}
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
    height: "100%",
  },
  logo: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
  },
  windowTab: {
    height: "92%",
    width: "100%",
    backgroundColor: "#1D1F24",
    top: "7%",
    borderRadius: 20,
    padding: 20,
  },
  inputLogin: {
    marginVertical: 10,
  },
  inputEmail: {
    color: "#fff",
  },
  inputPassword: {
    color: "#fff",
  },
});

export default SignInScreen;
