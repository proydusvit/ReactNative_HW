import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import db from "../../firebase/config";

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/Photo-BG.jpg")}
      >
        <View style={styles.gallery}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.logout} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.login}>{login}</Text>

          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.photoTitle}>{item.photoName}</Text>
                <View style={styles.commentAndLocation}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.comments}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.comments, marginLeft: 24 }}
                    >
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.location}
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: item.location,
                          photoName: item.photoName,
                        })
                      }
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.locationName}>
                        {item.locationName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 147,
  },
  gallery: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 43,
    paddingTop: 22,
    paddingBottom: 11,
    height: 665,
  },
  avatar: {
    width: 120,
    height: 120,
    position: "absolute",
    left: 128,
    top: -60,
    borderRadius: 16,
  },
  logout: {
    alignItems: "flex-end",
    // position: "absolute",
    right: 16,
    // top: 22,
  },
  login: {
    textAlign: "center",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    // ??
    marginTop: 46,
    marginBottom: 33,
  },
  post: {
    // height: 299,
    // marginTop: 32,
    marginBottom: 32,
  },
  photo: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
    // marginHorizontal: 16,
    // marginBottom: 8,
  },
  photoTitle: {
    marginBottom: 8,
    marginTop: 8,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  commentAndLocation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: 16,
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsAmount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    // marginLeft: 4,
    textAlign: "right",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
