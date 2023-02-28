import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { Camera, CameraType } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  mail: "",
  password: "",
  avatar: null,
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const avatar = await camera.takePictureAsync();
    setState((prev) => ({ ...prev, avatar: avatar.uri }));
  };

  const registration = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Photo-BG.jpg")}
        >
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 140 : 0,
                },
                android: {
                  ...styles.form,
                  // paddingBottom: isShowKeyboard ? 0 : 78,
                },
              }),
            }}
          >
            <Camera
              style={styles.camera}
              ref={setCamera}
              type={CameraType.front}
            >
              {state.avatar && (
                <>
                  <View style={styles.takePhotoBox}>
                    <Image
                      source={{ uri: state.avatar }}
                      style={styles.avatar}
                    />
                  </View>
                </>
              )}
            </Camera>
            {state.avatar && (
              <TouchableOpacity
                onPress={() => {
                  setState((prev) => ({ ...prev, avatar: "" }));
                }}
                style={{
                  position: "absolute",
                  bottom: 510,
                  right: 126,
                  width: 24,
                  height: 24,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#E8E8E8",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="close" size={20} color="#BDBDBD" />
              </TouchableOpacity>
            )}
            {!state.avatar && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 510,
                  right: 124,
                }}
                onPress={takePhoto}
              >
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            )}
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                style={styles.input}
                value={state.login}
                placeholder="Імʼя"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                value={state.mail}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, mail: value }))
                }
              />
              <TextInput
                style={styles.input}
                value={state.password}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <Text
                style={styles.showPassword}
                onPress={() => {
                  setIsPasswordSecure(!isPasswordSecure);
                }}
              >
                {isPasswordSecure ? "Показати" : "Приховати"}
              </Text>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={registration}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    height: 549,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    position: "absolute",
    overflow: "hidden",
    top: -60,
    left: "35%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  takePhotoBox: {
    position: "absolute",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  text: {
    marginTop: 92,
    marginHorizontal: 16,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    fontFamily: "Roboto-Medium",
  },
  input: {
    position: "relative",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  showPassword: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: 315,
      },
      android: {
        top: 338,
      },
    }),
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
