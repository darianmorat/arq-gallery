import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Category = {
   id: string;
   title: string;
   tag: string;
   description: string;
};

type Store = {
   isLoading: boolean;
   categories: Category[];
   getCategories: () => Promise<void>;
   createCategory: (title: string, tag: string, description: string) => Promise<void>;
   deleteCategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<Store>((set, get) => ({
   isLoading: false,
   categories: [],

   getCategories: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/category/get-all");

         if (res.data.success) {
            set({ categories: res.data.categories });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createCategory: async (title, tag, description) => {
      try {
         const body = {
            title: title,
            tag: tag,
            description: description,
         };

         const res = await api.post("/category/create", body);

         if (res.data.success) {
            toast.success(res.data.message);
            get().getCategories();
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },

   deleteCategory: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/category/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            await get().getCategories();
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },
}));
