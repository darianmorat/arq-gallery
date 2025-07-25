import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type User = {
   id: string;
   name: string;
   username: string;
   email: string;
   posts: Post[];
};

type Post = {
   id: string;
};

type Store = {
   isLoading: boolean;
   users: User[];
   getUsers: () => Promise<void>;
   createUser: (
      name: string,
      username: string,
      phone: string,
      email: string,
      password: string,
   ) => Promise<void>;
   deleteUser: (id: string) => Promise<void>;
};

export const useUserStore = create<Store>((set, get) => ({
   isLoading: false,
   users: [],
   categories: [],

   getUsers: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/user/get-all");
         if (res.data.success) {
            set({ users: res.data.users });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createUser: async (name, username, phone, email, password) => {
      set({ isLoading: true });
      try {
         const body = {
            name: name,
            username: username,
            phone: phone,
            email: email,
            password: password,
         };

         const res = await api.post("/user/create", body);

         if (res.data.success) {
            toast.success(res.data.message);
            await get().getUsers();
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteUser: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/user/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            await get().getUsers();
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },
}));
