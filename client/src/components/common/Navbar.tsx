import { Bell, GalleryVerticalEnd, LogOut, User } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const Navbar = () => {
   const { isAuth, logout } = useAuthStore();
   const isAdmin = useIsAdmin();
   const navigate = useNavigate();

   return (
      <nav className="flex justify-between px-24 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
         <a onClick={() => navigate("/")} className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
               <GalleryVerticalEnd className="size-4" />
            </div>
            Arq Gallery
         </a>
         <div className="flex gap-4 items-center">
            {isAuth ? (
               <>
                  <Input type="search" placeholder="Buscar..." />

                  {isAdmin ? (
                     <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
                  ) : (
                     <Button onClick={() => navigate("/create")}>Create</Button>
                  )}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Avatar>
                           {/* this can be updated in profile for the user */}
                           <AvatarImage src="https://github.com/shadcn.png" />
                           {/* use the username initals, with a code snippet */}
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                           <User /> Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("#")}>
                           <Bell /> Alertas
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem
                           className="text-red-500 dark:text-red-400 focus:text-red-500"
                           onClick={() => logout()}
                        >
                           <LogOut className="text-red-400" /> Cerrar sesión
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </>
            ) : (
               <Button onClick={() => navigate("/login")}>Login</Button>
            )}
            <ModeToggle />
         </div>
      </nav>
   );
};
