import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import toast from "react-hot-toast";

export const signUp = async (email, password, userData) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    });

    await sendEmailVerification(user);
    toast.success("Account created! Please verify your email.");
    return user;
  } catch (error) {
    let errorMessage = "Failed to create account";

    if (error.message.includes("email-already-in-use")) {
      errorMessage = "Email already exists";
    } else if (error.message.includes("weak-password")) {
      errorMessage = "Password too weak (min 6 characters)";
    } else if (error.message.includes("invalid-email")) {
      errorMessage = "Invalid email address";
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if (!user.emailVerified) {
      toast.error("Please verify your email first");
      await signOut(auth);
      throw new Error("Email not verified");
    }

    toast.success("Welcome back!");
    return user;
  } catch (error) {
    let errorMessage = "Login failed";

    if (error.message.includes("user-not-found")) {
      errorMessage = "No account found with this email";
    } else if (error.message.includes("wrong-password")) {
      errorMessage = "Incorrect password";
    } else if (error.message === "Email not verified") {
      throw error;
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed");
    throw error;
  }
};
