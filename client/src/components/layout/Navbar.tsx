import { Bell, Layers, LogOut, User } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../ui/ModeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { LayoutContainer } from "./Container";

// PENDING:
// ADD AN AVATAR IMAGE FROM THE EDIT PROFILE, THIS CAN BE STORED IN THE CURRENT CLOUD
// PROVIDER, SO WE CAN HAVE MORE PERSONALIZATION

export const Navbar = () => {
   const { isAuth, user, logout } = useAuthStore();
   const isAdmin = useIsAdmin();
   const navigate = useNavigate();
   const shortUserName = user?.name.slice(0, 1);
   const username = user?.username;

   return (
      <nav className="w-full bg-zinc-100 dark:bg-zinc-900 border-b sticky top-0 z-1">
         <LayoutContainer className="flex gap-4">
            <a
               onClick={() => navigate("/")}
               className="flex items-center gap-2 font-medium whitespace-nowrap cursor-pointer"
            >
               <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 size-10"
                  alt="Flowbite Logo"
               />

               <p className="hidden sm:block">ArGallery</p>
            </a>
            <div className="w-full flex gap-4">
               <Input type="search" placeholder="Buscar" className="grow" />
               {isAuth ? (
                  <>
                     {isAdmin ? (
                        <>
                           <Button
                              variant={"outline"}
                              onClick={() => navigate("/create")}
                              className="hidden sm:block"
                           >
                              Ilustración
                           </Button>
                           <Button
                              onClick={() => navigate("/dashboard")}
                              className="hidden sm:block"
                           >
                              Dashboard
                           </Button>
                        </>
                     ) : (
                        <Button
                           onClick={() => navigate("/create")}
                           className="hidden sm:block"
                        >
                           Ilustración
                        </Button>
                     )}

                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Avatar className="h-full w-9 cursor-pointer">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-blue-200/80 text-blue-600 text-xl pb-0.5">
                                 {shortUserName}
                              </AvatarFallback>
                           </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem onClick={() => navigate(`/${username}`)}>
                              <User /> Perfil
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => navigate("#")}>
                              <Bell /> Alertas
                           </DropdownMenuItem>

                           {isAdmin ? (
                              <>
                                 <DropdownMenuItem
                                    onClick={() => navigate("/create")}
                                    className="sm:hidden"
                                 >
                                    <Layers /> Ilustración
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onClick={() => navigate("/dashboard")}
                                    className="sm:hidden"
                                 >
                                    <Layers /> Dashboard
                                 </DropdownMenuItem>
                              </>
                           ) : (
                              <DropdownMenuItem
                                 onClick={() => navigate("/create")}
                                 className="sm:hidden"
                              >
                                 <Layers /> Ilustración
                              </DropdownMenuItem>
                           )}

                           <Separator className="my-1" />

                           <DropdownMenuItem
                              className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-50/10 dark:font-medium"
                              onClick={() => logout()}
                           >
                              <LogOut className="text-red-600" /> Cerrar sesión
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </>
               ) : (
                  <Button onClick={() => navigate("/login")}>Acceder</Button>
               )}
               <ModeToggle />
            </div>
         </LayoutContainer>
      </nav>
   );
};
