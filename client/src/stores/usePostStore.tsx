import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";


type Post = {
   id: string;
   title: string;
   description: string;
   publicId: string;
   author: {
      name: string;
      username: string;
      phone: string;
   };
   category: {
      title: string;
      description: string;
      tag: string;
   } | null;
   mediaUrl: string;
   createdAt: string;
};

type Values = {
   category: string;
   title: string;
   description: string;
};

type Store = {
   isLoading: boolean;
   notFound: boolean;
   postProfile: Post | null;
   posts: Post[];
   getPosts: () => Promise<void>;
   getPost: (publicId: string) => Promise<void>;
   getUserPosts: (username: string) => Promise<void>;
   uploadPost: (files: File[], formValues: Values) => Promise<boolean | void>;
   deletePost: (id: string) => Promise<void>;
};

export const usePostStore = create<Store>((set, get) => ({
   isLoading: false,
   notFound: false,
   postProfile: null,
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

   getPost: async (publicId) => {
      set({ isLoading: true, notFound: false });
      try {
         const res = await api.get(`/post/get/${publicId}`);

         if (res.data.success) {
            set({ postProfile: res.data.post });
         }
      } catch (_error) {
         set({ notFound: true });
      } finally {
         set({ isLoading: false });
      }
   },

   getUserPosts: async (username) => {
      set({ isLoading: true });
      try {
         const res = await api.get(`/post/get-all-user/${username}`);

         if (res.data.success) {
            set({ posts: res.data.posts });
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

   deletePost: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/post/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            await get().getPosts();
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },
}));
