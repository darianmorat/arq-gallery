import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Image = {
   id: string;
   mediaUrl: string;
};

type Store = {
   isLoading: boolean;
   images: Image[];
   getImages: () => Promise<void>;
   uploadPost: (files: File[]) => Promise<boolean | void>;
};

export const usePostStore = create<Store>((set, _get) => ({
   isLoading: false,
   images: [],

   getImages: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/post/get-all");
         if (res.data.success) {
            set({ images: res.data.posts });
            // console.log(res.data.posts);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   uploadPost: async (files) => {
      set({ isLoading: true });
      try {
         const res = await api.get("/post/generate-signature");

         const uploadResults = [];

         for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
            formData.append("timestamp", res.data.timestamp);
            formData.append("signature", res.data.signature);

            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const cloudRes = await fetch(
               `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
               {
                  method: "POST",
                  body: formData,
               },
            );

            if (!cloudRes.ok) {
               throw new Error();
            }

            const uploadedData = await cloudRes.json();

            if (uploadedData.secure_url) {
               uploadResults.push(uploadedData);

               await api.post("/post/save-metadata", {
                  public_id: uploadedData.public_id,
                  secure_url: uploadedData.secure_url,
                  resource_type: uploadedData.resource_type,
               });
            }
         }
         toast.success("Imagenes subidas exitosamente");
         console.log(uploadResults); // testing
         return !uploadResults[0]?.error;
      } catch (error) {
         toast.error(error.response?.data?.message || "Fallo en subida");
      } finally {
         set({ isLoading: false });
      }
   },
}));
