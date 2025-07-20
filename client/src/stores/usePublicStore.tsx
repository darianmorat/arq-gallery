import { create } from "zustand";
import api from "@/api/axios";

type User = {
   id: string;
   name: string;
   email: string;
   role: "admin" | "user";
   createdAt: string;
};

type Store = {
   isLoading: boolean;
   userProfile: User | null;
   userNotFound: boolean;
   getUser: (username: string) => Promise<void>;
};

export const usePublicStore = create<Store>((set, _get) => ({
   isLoading: false,
   userNotFound: false,
   userProfile: null,

   getUser: async (username) => {
      set({ isLoading: true, userNotFound: false });
      try {
         const res = await api.get(`/public/user/${username}`);

         if (res.data.success) {
            set({ userProfile: res.data.user });
         }
      } catch (_error) {
         set({ userNotFound: true });
      } finally {
         set({ isLoading: false });
      }
   },
}));
