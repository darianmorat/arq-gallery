import { z } from "zod";
import { Button } from "../../ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { X, FileText, Hash, AlignLeft } from "lucide-react";
import { useDashStore } from "@/stores/useDashStore";
import { Modal } from "../Modal";
import { Textarea } from "../../ui/textarea";

// PENDING:
// WE SHOULD NOT CLOSE THE MODAL WHEN THE USERNAME OR EMAIL IS ALREADY IN USE, WE
// SHOULD INSTEAD JUST SHOW THE NOTIFICATION AND KEEP IT OPEN

type CreateCategoryModalProps = {
   handleModal: (modal: string) => void;
};

const formSchema = z.object({
   title: z
      .string()
      .min(4, { message: "Mínimo 4 caracteres" })
      .max(100, { message: "Máximo 100 caracteres" }),
   tag: z
      .string()
      .min(4, { message: "Mínimo 4 caracteres" })
      .max(100, { message: "Máximo 50 caracteres" })
      .regex(/^[a-zA-Z0-9-_]+$/, {
         message: "Solo letras, números, guiones y guiones bajos",
      })
      .transform((val) => val.toLowerCase()),
   description: z.string().min(10, { message: "Mínimo 10 caracteres" }),
});

export const CreateCategoryModal = ({ handleModal }: CreateCategoryModalProps) => {
   const { createCategory } = useDashStore();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         tag: "",
         description: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      createCategory(values.title, values.tag, values.description);
      handleModal("");
      form.reset();
   }

   return (
      <Modal>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="relative bg-background dark:bg-accent p-6 rounded-lg m-4 w-full max-w-100">
                  <h1 className="text-2xl font-bold">Crear categoría</h1>
                  <p className="text-muted-foreground text-sm">
                     Completa la información para crear una nueva categoría
                  </p>
                  <Button
                     type="button"
                     variant={"ghost"}
                     className="absolute right-2 top-2 text-muted-foreground"
                     onClick={() => handleModal("")}
                  >
                     <X />
                  </Button>
                  <div className="grid gap-4 pt-5">
                     <FormField
                        control={form.control}
                        name="title"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <FileText
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       placeholder="Edificio las flores"
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
                        name="tag"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tag</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Hash
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       placeholder="religion"
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
                                       placeholder="Describe la categoría y su propósito..."
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
                     <div className="flex gap-2 pt-2">
                        <Button
                           variant={"default"}
                           type="submit"
                           // disabled={isLoading}
                           className="flex-1/2"
                        >
                           Crear
                        </Button>
                        <Button
                           type="button"
                           variant={"outline"}
                           onClick={() => handleModal("")}
                           // disabled={isLoading}
                           className="flex-1/2"
                        >
                           Cancelar
                        </Button>
                     </div>
                  </div>
               </div>
            </form>
         </Form>
      </Modal>
   );
};
