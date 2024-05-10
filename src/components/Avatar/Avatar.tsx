import {Image} from "react-native";
import React, {useState} from "react";
import userImg from "../../../assets/images/user-prime.png";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;

const Avatar = ({
  image,
  userId,
  style,
  noCache,
  noCacheId,
}) => {
  const [error, setError] = useState(false);
  var sourceImage = error && !image ? userImg :  { uri: image ?? (`${API_ADDRESS}/api/avatar/get/${userId}` + (noCache ? '?' + noCacheId : '')) }

  return (
      <Image
          source={sourceImage}
          onError={() => setError(true)}
          style={style}

      />
  );
};

export default Avatar;
