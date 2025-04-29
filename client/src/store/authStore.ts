import { create } from "zustand";
import peertopeerapi from "@/lib/axios";
import { toast } from "react-hot-toast";
import { IUser } from "@/lib/interfaces";
import { disconnectSocket, initializeSocket } from "@/socket";

export interface IAuthStore {
  user: IUser | null;
  users: IUser[];
  usersLoading: boolean;
  signUpLoading: boolean;
  loginLoading: boolean;
  checkAuthLoading: boolean;
  checkingAuth: boolean;

  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  getAllUsers: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const authStore = create<IAuthStore>((set) => ({
  user: null,
  users: [],
  usersLoading: false,
  signUpLoading: false,
  loginLoading: false,
  checkAuthLoading: false,
  checkingAuth: true,

  signup: async (username, email, password) => {
    set({ signUpLoading: true });

    try {
      const res = await peertopeerapi.post("/auth/signup", {
        username,
        email,
        password,
      });
      set({ user: res.data.user, signUpLoading: false, checkingAuth: false });
      initializeSocket(res.data.user._id);
      toast.success(res.data.message || "Account created successfully.")
    } catch (error: unknown) {
        console.error(error);
        set({ signUpLoading: false });
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ signUpLoading: false });
    }
  },

  login: async (email, password) => {
    set({ loginLoading: true });
    try {
      const res = await peertopeerapi.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, loginLoading: false, checkingAuth: false });
      initializeSocket(res.data.user._id);
      toast.success(res.data.message || "Logged in successfully");
    } catch (error: unknown) {
        console.error(error);
        set({ loginLoading: false });
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    try {
      await peertopeerapi.post("/auth/logout");
      set({ user: null });
      disconnectSocket();
      toast.success('Logout successfully')
    } catch (error: unknown) {
        console.error(error);
        set({ loginLoading: false });
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, checkAuthLoading: true });
    try {
      const res = await peertopeerapi.get("/auth/profile");
      set({
        user: res.data.user,
        checkingAuth: false,
        checkAuthLoading: false,
      });
    } catch (error: unknown) {
      console.error(error);
      set({ user: null, checkingAuth: false, checkAuthLoading: false });
    } finally {
      set({ checkAuthLoading: false });
    }
  },

  getAllUsers: async () => {
    try {
      set({ usersLoading: true });
      const res = await peertopeerapi.get("/auth/users");
      console.log(res.data.users, "from store");
      set({ users: res.data.users, usersLoading: false });
    } catch (error: unknown) {
      console.error(error);
      set({ users: [], usersLoading: false });
    }finally {
      set({ usersLoading: false });
    }
  },
}));

