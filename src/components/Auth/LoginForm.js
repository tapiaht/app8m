import React, {useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  Image
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("El usuario o la contraseña no son correcto");
      } else {
        // login(userDetails);
        login(userInfo);
      }
    },
  });
  function start(){
    login(userInfo);
  }
 
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
  // const signOut=async ()=>{
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await auth().signOut();
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const handleLogout = async () => {
  //   try {
  //     setUserInfo(null);
  //   this.setState({ userInfo: null });
  //   await AsyncStorage.removeItem("@user");
  //   start();
  //   } catch (error) {
  //     // console.error(error);
  //   }
  // };
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
      
      <View style={styles.card}>                        
    
        {userInfo?.picture && (
          <Image source={{ uri: userInfo?.picture }} style={styles.image} />
        )}
        <Text style={styles.text}>Email: {userInfo.email}</Text>
        <Text style={styles.text}>
          Verified: {userInfo.verified_email ? "yes" : "no"}
        </Text> 
         <Text style={styles.text}>Name: {userInfo.name}</Text>
    
    <Button
      title="Cerrar Sesion"
      onPress={async () =>{ await AsyncStorage.removeItem("@user")
      // onPress={handleLogout}
      // onPress={signOut}
    }}
    /> 
    </View>        
    )}                    
      <Text style={styles.title}>Iniciar sesión</Text>
      <Button title="Entrar" onPress={start} />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
