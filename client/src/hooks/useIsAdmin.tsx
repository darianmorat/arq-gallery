import { useAuthStore } from "@/stores/useAuthStore";

export const useIsAdmin = () => {
   const { user } = useAuthStore();
   return user?.role === "admin";
};
