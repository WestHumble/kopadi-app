import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    ScrollView, Image, ActivityIndicator,
} from "react-native";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../../components/CustomButton";
import {ApiContext} from "../../context/ApiContext";
import mime from "mime";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const EditProfileScreen = () => {
    const [image, setImage] = useState(null);
    const {post} = useContext(ApiContext)
    const sendAvatar = (image) => {
        const formData = new FormData();
        const imageUri = 'file:///' + image.uri.split('file:/').join('')

        const imageObject = {
            name: image.uri.split('/').pop(),
            height: image.height,
            width: image.width,
            type: mime.getType(imageUri),
            uri: imageUri,
        }
        formData.append('file', imageObject)

        post('avatar',
            formData,
            res => {
                console.log('success')
            }, res => {
                console.error('fail')
                console.log(res.data)
            }, false
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            sendAvatar(result.assets[0])
        }
    };

    const {userData, fetchUserData} = useContext(AuthContext);
    const {height} = useWindowDimensions();

    const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false)

    if (!userData) {
        if (!isLoadingUserData) {
            fetchUserData()
            setIsLoadingUserData(true)
        }
        return (
            <View style={{
                flex: 1, justifyContent: "center",
                backgroundColor: "#131417", alignItems: "center"
            }}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return (
        <>
            <View style={[styles.root, {height: height * 1}]}>
                <View style={styles.windowTab}>
                    <CustomButton text="Pick an image" onPress={pickImage}/>
                    <Image source={{uri: image ?? `${API_ADDRESS}/api/avatar/get/${userData.id}?` + Date.now()}}
                           style={{width: 100, height: 100}}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
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
});

export default EditProfileScreen;
