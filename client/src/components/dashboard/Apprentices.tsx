import { Eye, List, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { CreateUserModal } from "./CreateUserModal";
import { useDashStore } from "@/stores/useDashStore";
import { DeleteUserModal } from "./DeleteUserModal";
import { useNavigate } from "react-router-dom";

// PENDING:
// DINAMIC POSTS FOR THE APPRENTICES IN THE TABLE
// TAKE ALL THE POSTS TO ALSO SHOW THE POSTS DINAMICALY

type User = {
   id: string;
   name: string;
};

export const Apprentices = () => {
   const [showModal, setShowModal] = useState({ active: false, for: "" });
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const { users = [], getUsers } = useDashStore();

   const navigate = useNavigate();
   const totalPosts = users.reduce((sum, user) => sum + user.posts.length, 0);

   const handleModal = (modal: string): void => {
      setShowModal((prev) => ({ active: !prev.active, for: modal }));
   };

   useEffect(() => {
      getUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-8">
               <div>
                  <p className="text-3xl font-bold">
                     {users.length.toString().padStart(2, "0")}
                  </p>
                  <h1>Total usuarios</h1>
               </div>
               <div>
                  <p className="text-3xl font-bold">
                     {totalPosts.toString().padStart(2, "0")}
                  </p>
                  <h1>Total posts</h1>
               </div>
            </div>
            <Button onClick={() => handleModal("create")}>
               <Plus /> Crear usuario
            </Button>
         </div>
         <Separator className="my-8" />
         <div className="overflow-x-auto rounded-sm border-1">
            <table className="min-w-full text-left">
               <thead className="bg-accent uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3 min-w-fit">Aprendices</th>
                     <th className="px-6 py-3 min-w-fit">Posts</th>
                     <th className="px-6 py-3 min-w-sm text-right">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {users.length === 0 && (
                     <tr>
                        <td colSpan={3} className="text-center py-6">
                           No hay usuarios para mostrar
                        </td>
                     </tr>
                  )}
                  {users.map((user) => (
                     <tr key={user.id}>
                        <td className="px-6 py-4">
                           <div className="font-medium">{user.name}</div>
                           <div className="text-sm text-gray-500 max-w-70 truncate">
                              {user.email}
                           </div>
                        </td>
                        <td className="px-6 py-6 flex items-center gap-2">
                           <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-200 text-sm font-medium px-2.5 py-2 rounded">
                              {user.posts.length.toString().padStart(2, "0")}
                           </span>
                           posts
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <Button
                              variant="outline"
                              onClick={() => navigate(`/${user.username}`)}
                           >
                              <Eye /> Ver perfil
                           </Button>
                           <Button variant="outline">
                              <List /> Ver posts
                           </Button>
                           <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                 handleModal("delete");
                                 setSelectedUser(user);
                              }}
                           >
                              <Trash /> Eliminar
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {showModal.active && showModal.for === "create" && (
            <CreateUserModal handleModal={() => handleModal("")} />
         )}
         {showModal.active && showModal.for === "delete" && selectedUser && (
            <DeleteUserModal handleModal={() => handleModal("")} user={selectedUser} />
         )}
      </>
   );
};
