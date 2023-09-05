import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config";
import { updateUserProfile, authStateChange, signOutUser } from "./authReducer";
const signUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await updateProfile(user, { displayName: login });
      const upload = await auth.currentUser;
      const userUpdateProfile = {
        userId: upload.uid,
        login: upload.displayName,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      return user;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user) {
        console.log("Wrong email or password");
        return;
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
const userSignOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(signOutUser());
};
const stateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
export { signUpUser, signInUser, userSignOut, stateChangeUser };
