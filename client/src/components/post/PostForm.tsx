import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { FileText, AlignLeft, List, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useDashStore } from "@/stores/useDashStore";
import { useEffect, useState } from "react";
import { DropImage } from "./DropImage";
import { usePostStore } from "@/stores/usePostStore";
import { Button } from "../ui/button";
import { Modal } from "../dashboard/Modal";
import { useNavigate } from "react-router-dom";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

const formSchema = z.object({
   title: z
      .string()
      .min(4, { message: "Mínimo 4 caracteres" })
      .max(100, { message: "Máximo 100 caracteres" }),
   description: z
      .string()
      .min(10, { message: "Mínimo 10 caracteres" })
      .max(300, { message: "Máximo 300 caracteres" }),
   category: z.string({
      required_error: "Selecciona una categoría",
   }),
});

export const PostForm = () => {
   const [files, setFiles] = useState<FileWithPreview[]>([]);
   const { isLoading, uploadPost } = usePostStore();
   const { categories = [], getCategories } = useDashStore();
   const [successPopup, setSuccessPopup] = useState(false);

   const navigate = useNavigate();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         description: "",
      },
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await uploadPost(files, values);

      if (res === true) {
         setFiles([]);
         form.reset();
         setSuccessPopup(true);
      }
   }

   useEffect(() => {
      getCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const isFormValid = form.formState.isValid && !form.formState.isSubmitting;

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="bg-background dark:bg-zinc-900 flex flex-col gap-4">
                  <div className="flex flex-col gap-4 flex-1">
                     <FormField
                        control={form.control}
                        name="title"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Titulo</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <FileText
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       placeholder="Titulo de tu publicación"
                                       {...field}
                                       className="pl-10"
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Categoría</FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <div className="relative">
                                       <List
                                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                          size={20}
                                       />
                                       <SelectTrigger className="pl-10 w-full">
                                          <SelectValue placeholder="Selecciona una opción" />
                                       </SelectTrigger>
                                    </div>
                                 </FormControl>
                                 <SelectContent>
                                    {categories.map((category) => (
                                       <SelectItem key={category.id} value={category.tag}>
                                          #{category.tag}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="description"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <AlignLeft
                                       className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground"
                                       size={20}
                                    />
                                    <Textarea
                                       placeholder="Describe tu publicación y su propósito..."
                                       {...field}
                                       className="pl-10 h-30 resize-none"
                                       rows={5}
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex-1">
                     <DropImage files={files} setFiles={setFiles} />
                     <div className="flex justify-end items-center pt-6 border-t gap-3">
                        {files.length >= 1 && (
                           <Button
                              variant="outline"
                              onClick={() => setFiles([])}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                           >
                              Limpiar imágenes
                           </Button>
                        )}

                        <div className="flex justify-end grow gap-3">
                           <Button
                              type="button"
                              variant="outline"
                              disabled={isLoading || files.length === 0}
                           >
                              Vista previa
                           </Button>
                           <Button
                              variant="default"
                              disabled={isLoading || files.length === 0 || !isFormValid}
                           >
                              {isLoading ? (
                                 <>Subiendo publicación...</>
                              ) : (
                                 <>Crear publicación</>
                              )}
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </Form>

         {successPopup && (
            <Modal>
               <div className="relative bg-background flex flex-col gap-4 p-6 text-center rounded-lg">
                  <X
                     className="top-1 absolute right-1 m-2 cursor-pointer"
                     size={18}
                     onClick={() => setSuccessPopup(false)}
                  />
                  <h2 className="text-2xl font-bold">Felicidades!</h2>
                  Tu publicacion a sido publicada exitosamente
                  <Button onClick={() => navigate("/")}>Explorar inicio</Button>
               </div>
            </Modal>
         )}
      </>
   );
};
