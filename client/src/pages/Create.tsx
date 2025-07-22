import { LayoutContainer } from "@/components/layout/Container";
import { AlertCircle } from "lucide-react";
import { PostForm } from "@/components/post/PostForm";

// PENDING:
// JUST ALLOW 1 IMAGE UPLOAD AND 1 IMAGE WITH THE 3D MODEL, FOR NOW WE JUST LET THE USERS
// TO UPLOAD AN IMAGE, THEN WE CAN UPDATE THE LOGIC FOR THE 3D MODEL

export const Create = () => {
   return (
      <LayoutContainer size="medium" className="my-4">
         <div className="mb-5">
            <h1 className="text-3xl font-bold mb-2">Crear Publicación</h1>
            <p className="text-muted-foreground">Comparte tu trabajo con la comunidad</p>
         </div>

         <div className="bg-blue-50 dark:bg-blue-200/10 border border-blue-200 dark:border-blue-200/50 rounded-lg p-6">
            <div className="flex items-start">
               <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-300 mt-0.5 mr-3 flex-shrink-0" />
               <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                     Pautas para crear publicaciones
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                     <li>• Todos los campos son obligatorios</li>
                     <li>• Evita contenido ofensivo o inapropiado</li>
                     <li>• Tamaño máximo: 20MB por archivo</li>
                     <li>• Máximo de 10 imágenes por publicación</li>
                     <li>• Formatos aceptados: JPG, PNG</li>
                     <li>• Las imágenes deben ser de tu autoría propia</li>
                  </ul>
               </div>
            </div>
         </div>

         <div className="rounded-lg border p-6 mt-6 dark:bg-zinc-900">
            <div className="space-y-4">
               <PostForm />
            </div>
         </div>
      </LayoutContainer>
   );
};
