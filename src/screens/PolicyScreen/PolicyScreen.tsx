import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ApiContext } from "../../context/ApiContext";

const PolicyScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={[styles.root, { height: height * 1 }]}>
      <View style={styles.windowTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title} resizeMode="contain">
            Warunki użytkowania i polityka prywatności
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            accumsan magna non lacus sagittis, vitae maximus libero eleifend.
            Duis fringilla cursus orci vel sagittis. Pellentesque eu enim nulla.
            In ultrices nisl vestibulum risus vestibulum, vitae vehicula est
            pulvinar. Suspendisse eros lectus, pretium in nisi eget, euismod
            mollis quam. Morbi dignissim congue ligula, ut efficitur sem
            placerat sit amet. Sed euismod ex dignissim lorem imperdiet semper.
            Proin molestie odio ac dui consectetur, sit amet fringilla quam
            finibus. Morbi varius felis ut tortor vestibulum, sit amet iaculis
            diam ullamcorper. Sed viverra pretium libero id mattis. Morbi
            interdum convallis faucibus.
          </Text>
          <CustomButton
            text="Wróć do logowania"
            onPress={onBackToLoginPressed}
            additionalStyles={{ marginTop: 20 }}
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
    color: "#999999",
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
    color: "#ffffff",
  },
});

export default PolicyScreen;
