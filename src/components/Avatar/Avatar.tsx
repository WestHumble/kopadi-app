import {Image, Pressable} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import userImg from "../../../assets/images/user-prime.png";
import {NavigationContext} from "../../context/NavigationContext";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;

const Avatar = ({
                    image,
                    userId,
                    userName,
                    userSurname,
                    style,
                    noCache,
                    noCacheId,
                    allowRedirect = true,
                }) => {
    const [error, setError] = useState(false);
    useEffect(() => {
        setError(false)
    }, [userId, noCacheId]);
    var sourceImage = error && !image ? userImg : {uri: image ?? (`${API_ADDRESS}/api/avatar/get/${userId}` + (noCache ? '?' + noCacheId : ''))}

    const {navigationRef} = useContext(NavigationContext);
    return (
        <Pressable disabled={!allowRedirect} onPress={() => navigationRef.current?.navigate('DisplayProfile', {
            userId: userId,
            userName: userName,
            userSurname: userSurname,
        })}>
            <Image
                source={sourceImage}
                onError={() => setError(true)}
                style={style}

            />
        </Pressable>
    );
};

export default Avatar;
