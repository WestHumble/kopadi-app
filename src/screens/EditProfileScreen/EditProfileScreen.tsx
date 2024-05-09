import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/CustomButton";
import { ApiContext } from "../../context/ApiContext";
import mime from "mime";
import eventsRefreshImg from "../../../assets/images/refresh.png";
import avatarImg from "../../../assets/images/user-prime.png";
import CustomInput from "../../components/CustomInput";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const EditProfileScreen = () => {
  const [image, setImage] = useState(null);
  const { post } = useContext(ApiContext);
  const sendAvatar = (image) => {
    const formData = new FormData();
    const imageUri = "file:///" + image.uri.split("file:/").join("");

    const imageObject = {
      name: image.uri.split("/").pop(),
      height: image.height,
      width: image.width,
      type: mime.getType(imageUri),
      uri: imageUri,
    };
    formData.append("file", imageObject);

    post(
      "avatar",
      formData,
      (res) => {
        console.log("success");
      },
      (res) => {
        console.error("fail");
        console.log(res.data);
      },
      false,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      selectionLimit: 1,
      base64: true,
    });

    if (!result.canceled) {
      const fileSize = result.assets[0].base64
        ? result.assets[0].base64.length * (3 / 4) - 2
        : 0;
      if (fileSize > 5000000) {
        Alert.alert("Image size is too large!\nMax file size is 5MB.");
      } else {
        setImage(result.assets[0].uri);
        sendAvatar(result.assets[0]);
      }
    }
  };

  const { userData, fetchUserData } = useContext(AuthContext);
  const { height } = useWindowDimensions();

  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  if (!userData) {
    if (!isLoadingUserData) {
      fetchUserData();
      setIsLoadingUserData(true);
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#131417",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title} resizeMode="contain">
              Edytuj profil
            </Text>
            <View style={styles.avatarDiv}>
              <View style={styles.changeAvatarIcon}>
                <Pressable onPress={pickImage}>
                  <Image source={eventsRefreshImg} style={styles.refreshIcon} />
                </Pressable>
              </View>

              <View style={styles.imageProfile}>
                <Image
                  source={{
                    uri:
                      image ??
                      `${API_ADDRESS}/api/avatar/get/${userData.id}?` +
                        Date.now(),
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                />
              </View>
            </View>
            <View style={styles.dataDiv}>
              <CustomInput
                placeholder="Imię"
                value={userData.name}
                setValue={(value) => {}}
                secureTextEntry={undefined}
                additionalStyle={{
                  color: "#fff",
                }}
              />
              <CustomInput
                placeholder="Nazwisko"
                value={userData.surname}
                setValue={(value) => {}}
                secureTextEntry={undefined}
                additionalStyle={{
                  color: "#fff",
                }}
              />
              <CustomInput
                placeholder="Email"
                value={userData.email}
                setValue={(value) => {}}
                secureTextEntry={undefined}
                editable={false}
                additionalStyle={{
                  color: "#333333",
                }}
              />
              <View style={{ height: 20 }}></View>
              <CustomButton
                text="Zapisz"
                onPress={() => {}}
                type="PRIMARY"
                bgColor={undefined}
                fgColor={undefined}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
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
    height: "75%",
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
    marginTop: "5%",
    color: "#fff",
  },
  avatarDiv: {
    flexDirection: "row",
    justifyContent: "center",
  },
  refreshIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: "#F2B138",
  },
  changeAvatarIcon: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
    marginTop: 80,
    marginLeft: 50,
    backgroundColor: "#1D1F24",
    borderRadius: 50,
    padding: 5,
    right: 85,
    bottom: 9,
    borderWidth: 1,
    borderColor: "#F2B138",
  },
  imageProfile: {
    zIndex: 0,
    borderWidth: 3,
    borderColor: "#F2B138",
    borderRadius: 50,
    margin: 10,
  },
  dataDiv: {
    marginTop: 20,
  },
});

export default EditProfileScreen;
