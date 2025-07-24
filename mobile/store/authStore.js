import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

//whatever you return inside this object will be accessible from the other files this Zustand store provides a 'user' object and a 'sayHello' function. 'user' is accessible immediately when useAuthStore is used in a component. 'sayHello' only runs its code (console.log) when
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    //here we'll start by isLoading : true means loading will start when signup button is pressed
    set({ isLoading: true });
    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      //this is the data we'll get back from the server
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      //store the token and user in AsyncStorage
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      //here, state will be updated and we'll set the user and token to AsyncStorage
      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true }; //this success will be used in the register function to check if the user is registered successfully

    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },
}));
