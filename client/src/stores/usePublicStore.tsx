import { create } from "zustand";
import api from "@/api/axios";

type User = {
   id: string;
   name: string;
   email: string;
   role: "admin" | "user";
   createdAt: string;
};

type Post = {
   id: string;
   title: string;
   description: string;
   categoryId: string;
   authorId: string;
   mediaUrl: string;
   createdAt: string;
};

type Store = {
   isLoading: boolean;
   userProfile: User | null;
   postProfile: Post | null;
   notFound: boolean;
   getUser: (username: string) => Promise<void>;
   getPost: (publicId: string) => Promise<void>;
};

export const usePublicStore = create<Store>((set, _get) => ({
   isLoading: false,
   notFound: false,
   userProfile: null,
   postProfile: null,

   getUser: async (username) => {
      set({ isLoading: true, notFound: false });
      try {
         const res = await api.get(`/public/user/${username}`);

         if (res.data.success) {
            set({ userProfile: res.data.user });
         }
      } catch (_error) {
         set({ notFound: true });
      } finally {
         set({ isLoading: false });
      }
   },

   getPost: async (publicId) => {
      set({ isLoading: true, notFound: false });
      try {
         const res = await api.get(`/public/post/${publicId}`);

         if (res.data.success) {
            set({ postProfile: res.data.post });
         }
      } catch (_error) {
         set({ notFound: true });
      } finally {
         set({ isLoading: false });
      }
   },
}));
