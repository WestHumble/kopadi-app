import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";

const SocialSignInButtons = () => {
  const onSignInFacebookPressed = () => {
    console.warn("Kliknięto zalogowanie facebook");
  };
  const onSignInGooglePressed = () => {
    console.warn("Kliknięto zalogowanie google");
  };
  return (
    <>
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
    </>
  );
};

export default SocialSignInButtons;
