import { authSlice } from "./authReducer";
import db from "../../firebase/config";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({  name, mail, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(mail, password);
      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName:  name,
        email: mail,
        photoURL: avatar,
      });

      const { uid, displayName, email, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
         name: displayName,
        userId: uid,
        email: email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
           name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};
