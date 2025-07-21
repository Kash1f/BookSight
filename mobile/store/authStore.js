import { create } from "zustand";

//whatever you return inside this object will be accessible from the other files this Zustand store provides a 'user' object and a 'sayHello' function. 'user' is accessible immediately when useAuthStore is used in a component. 'sayHello' only runs its code (console.log) when
export const useAuthStore = create((set) => ({
  user: { name: "john" },

  sayHello: () => console.log("hello"),
  setUser: (user) => set({ user }),
}));
