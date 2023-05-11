import React from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
import useAuth from "../hooks/useAuth";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function Account() {
  const { auth } = useAuth();

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1053246940642-990uadounf2228ghslnt9tmmbnpa3p8i.apps.googleusercontent.com",
    iosClientId: "",
    webClientId: "1053246940642-i9fslj8lggfj7bob9g5vgrainoo6jac8.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);
  async function handleEffect() {
    const user = await getLocalUser();
    console.log("😀 user en local ", user);
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      console.log("😈 user google ", user);
    } catch (error) {
      console.log(error)
    }
  };
  return (
    
    <View>    
      {!userInfo ? (
        <Button
          title="Iniciar Session Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />       
      ) : (
        
        <View style={styles.safeArea}>                        
      
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          {/* <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text> */}
          {/* <Text style={styles.text}>Name: {userInfo.name}</Text> */}
      
      <Button
        title="Cerrar Sesion"
        onPress={async () =>{ await AsyncStorage.removeItem("@user")
        // promptAsync()
      }}
      /> 
      </View>        
      )}                    
     </View>
     
  );
  // return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}
