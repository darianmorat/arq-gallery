import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type User = {
   id: string;
   name: string;
   email: string;
};

// type Category = {
//    id: string;
//    name: string;
//    description: string;
// };

type Store = {
   isLoading: boolean;
   users: User[];
   // categories: Category[];
   getUsers: () => Promise<void>;
   createUser: (
      name: string,
      username: string,
      email: string,
      password: string,
   ) => Promise<void>;
   deleteUser: (id: string) => Promise<void>;
   // getCategories: () => Promise<void>;
};

export const useDashStore = create<Store>((set, get) => ({
   isLoading: false,
   users: [],
   // categories: [],

   getUsers: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/admin/user/get-all");
         if (res.data.success) {
            set({ users: res.data.users });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createUser: async (name, username, email, password) => {
      set({ isLoading: true });
      try {
         const body = {
            name: name,
            username: username,
            email: email,
            password: password,
         };

         const res = await api.post("/admin/user/create", body);

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
         const res = await api.delete(`/admin/user/delete/${id}`);

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

   // getCategories: async () => {
   //    set({ isLoading: true });
   //    try {
   //       const res = await api.get("/admin/categorie/get-all");
   //       if (res.data.success) {
   //          set({ categories: res.data.categories });
   //       }
   //    } catch (error) {
   //       toast.error(error.response.data.message);
   //    } finally {
   //       set({ isLoading: false });
   //    }
   // },
}));
