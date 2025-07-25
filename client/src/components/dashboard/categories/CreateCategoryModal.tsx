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
import { useCategoryStore } from "@/stores/useCategoryStore";
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
   const { createCategory } = useCategoryStore();

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
      <Modal orientation="right">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="relative flex flex-col justify-between bg-background dark:bg-accent w-full sm:w-lg h-full overflow-y-auto">
                  <div className="p-6 bg-accent border-b-1 sticky top-0 z-10">
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
                  </div>
                  <div className="p-6 flex-1">
                     <div className="grid gap-4">
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
                     </div>
                  </div>
                  <div className="flex bg-accent border-t-1 gap-2 p-6 sticky bottom-0 w-full">
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
            </form>
         </Form>
      </Modal>
   );
};
