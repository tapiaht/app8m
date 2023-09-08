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
// import { user, userDetails } from "../../utils/userDB";
import { getUsersApi,addUsersApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
// import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { set } from "lodash";

WebBrowser.maybeCompleteAuthSession();

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
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
        login(userDetails);
        // login(userInfo);
      }
    },
  });
  function start(){
    login(user);    
  }
 
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "721470406626-um6rqbohpkaqau0gbf5rbsn76h9eh3bu.apps.googleusercontent.com",
       expoClientId: "721470406626-um6rqbohpkaqau0gbf5rbsn76h9eh3bu.apps.googleusercontent.com",
    iosClientId: "",
    webClientId: "721470406626-jmemt89bqert67i91jebaha6gas5b1bq.apps.googleusercontent.com",
    //webClientId: "1053246940642-i9fslj8lggfj7bob9g5vgrainoo6jac8.apps.googleusercontent.com",

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
      fetchUser(user);
      // const user = await getUsersApi(userInfo.email);
      // console.log("🍺 "+user)
      // setUser(user);
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
      fetchUser(user);
      console.log("😈 user google ", user);
    } catch (error) {
      console.log(error)
    }
  };

  async function fetchUser(userg){
        try {
          console.log("🌞 "+userg.email)
          const user = await getUsersApi(userg.email);
          // console.log("🍺 "+Object.entries(user))
          if (user.message === "User not found") {
            console.log('User not found');
          const newuser={name:userg.name,email:userg.email,picture:userg.picture}
          const result = await addUsersApi(newuser);
          console.log("💪 usuario creado"+Object.entries(result))
          setUser(result)
          } else {
            console.log('User found '+Object.entries(user));
            setUser(user)
          }        
        } catch (e) {
          console.log("👃 "+e)
          
          // setUser(user)
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
      
  <View style={styles.card}>                        
    
        {userInfo?.picture && (
          <Image source={{ uri: userInfo?.picture }} style={styles.image} />
        )}
        <Text style={styles.text}>Email: {userInfo?.email}</Text>
        <Text style={styles.text}>
          Verified: {userInfo.verified_email ? "yes" : "no"}
        </Text> 
         <Text style={styles.text}>Name: {userInfo?.name}</Text>
    
    <Button
      title="Cerrar Sesion"
      onPress={async () =>{ await AsyncStorage.removeItem("@user")
      setUserInfo(null); 
      setUser(null)     
    }}
    /> 
  </View>        
    )}                    
      <Text style={styles.title}>Ver perfil</Text>
      {/* <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      /> */}
      <Button title="Entrar" onPress={start} />
      {/* <Button title="Entrar" onPress={formik.handleSubmit} /> */}
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
