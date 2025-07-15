import { Eye, List, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const Apprentices = () => {
   return (
      <>
         <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-8">
               <div>
                  <p className="text-3xl font-bold">21</p>
                  <h1>Total usuarios</h1>
               </div>
               <div>
                  <p className="text-3xl font-bold">43</p>
                  <h1>Total posts</h1>
               </div>
            </div>
            <Button>
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
                  {[
                     {
                        name: "Darian Smith",
                        email: "dar@gmailtoledomoraistoledomora.com",
                        posts: 43,
                     },
                     {
                        name: "Sarah Johnson",
                        email: "sarah.j@gmail.com",
                        posts: 27,
                     },
                     {
                        name: "Darian Smith",
                        email: "dar@gmailtoledomoraistoledomora.com",
                        posts: 43,
                     },
                     {
                        name: "Darian Smith",
                        email: "dar@gmailtoledomoraistoledomora.com",
                        posts: 43,
                     },
                     {
                        name: "Darian Smith",
                        email: "dar@gmailtoledomoraistoledomora.com",
                        posts: 43,
                     },
                     {
                        name: "Darian Smith",
                        email: "dar@gmailtoledomoraistoledomora.com",
                        posts: 43,
                     },
                  ].map((apprentice, idx) => (
                     <tr key={idx}>
                        <td className="px-6 py-4">
                           <div className="font-medium">{apprentice.name}</div>
                           <div className="text-sm text-gray-500 max-w-70 truncate">
                              {apprentice.email}
                           </div>
                        </td>
                        <td className="px-6 py-6 flex items-center gap-2">
                           <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-200 text-sm font-medium px-2.5 py-2 rounded">
                              {apprentice.posts}
                           </span>
                           posts
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <Button variant="outline">
                              <Eye /> Ver perfil
                           </Button>
                           <Button variant="outline">
                              <List /> Ver posts
                           </Button>
                           <Button
                              variant="destructive"
                              className="border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white dark:bg-transparent dark:hover:bg-red-700 dark:border-red-400 dark:text-red-400 dark:hover:text-white"
                           >
                              <Trash /> Eliminar
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};
