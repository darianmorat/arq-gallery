import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Post = {
   id: string;
   mediaUrl: string;
   title: string;
   publicId: string;
};

type Values = {
   category: string;
   title: string;
   description: string;
};

type Store = {
   isLoading: boolean;
   posts: Post[];
   getPosts: () => Promise<void>;
   uploadPost: (files: File[], formValues: Values) => Promise<boolean | void>;
};

export const usePostStore = create<Store>((set, _get) => ({
   isLoading: false,
   posts: [],

   getPosts: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/post/get-all");
         if (res.data.success) {
            set({ posts: res.data.posts });
            // console.log(res.data.posts);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   uploadPost: async (files, formValues) => {
      set({ isLoading: true });
      try {
         if (files.length !== 1) {
            toast.error("Solo puedes subir una imagen.");
            return;
         }

         const res = await api.get("/post/generate-signature");
         // const uploadResults = [];

         // for (const file of files) { // this is to upload multiple images
         const file = files[0];

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
            // uploadResults.push(uploadedData);

            await api.post("/post/save-metadata", {
               public_id: uploadedData.public_id,
               secure_url: uploadedData.secure_url,
               resource_type: uploadedData.resource_type,
               category_tag: formValues.category,
               title: formValues.title,
               description: formValues.description,
            });
         }
         // }

         toast.success("Imagenes subidas exitosamente");
         // console.log(uploadResults); // testing
         return true;
      } catch (error) {
         toast.error(error.response?.data?.message || "Fallo en subida");
      } finally {
         set({ isLoading: false });
      }
   },
}));
