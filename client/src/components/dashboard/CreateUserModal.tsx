import { z } from "zod";
import { Button } from "../ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { User, Mail, Lock, X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDashStore } from "@/stores/useDashStore";
import { Modal } from "./Modal";

type CreateUserModalProps = {
   handleModal: (modal: string) => void;
};

const formSchema = z.object({
   name: z.string().min(4, { message: "Minimo 4 caracteres" }),
   email: z.string().email({ message: "Email invalido" }),
   password: z.string().min(1, { message: "Contraseña invalida" }),
});

export const CreateUserModal = ({ handleModal }: CreateUserModalProps) => {
   const [showPassword, setShowPassword] = useState(false);
   const { createUser } = useDashStore();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      createUser(values.name, values.email, values.password);
      handleModal("");
      form.reset();
   }

   const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
   };

   return (
      <Modal>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="relative bg-background dark:bg-accent p-6 rounded-lg m-4 w-full max-w-95">
                  <h1 className="text-2xl font-bold">Crear usuario</h1>
                  <p className="text-muted-foreground text-sm">
                     Completa la información para crear una nueva cuenta
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
                        name="name"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <User
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       placeholder="Jhon Smith"
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
                        name="email"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Correo</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Mail
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       placeholder="jhon@gmail.com"
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
                        name="password"
                        // disabled={isLoading}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Contraseña</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Lock
                                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                       size={18}
                                    />
                                    <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder={
                                          showPassword ? "Contraseña" : "********"
                                       }
                                       {...field}
                                       className="pl-10"
                                    />
                                    <Button
                                       type="button"
                                       variant={"ghost"}
                                       className="absolute right-0 top-0 text-muted-foreground"
                                       onClick={() => toggleShowPassword()}
                                       // disabled={isLoading}
                                    >
                                       {showPassword ? <Eye /> : <EyeOff />}
                                    </Button>
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
                           className="grow"
                        >
                           Aceptar
                        </Button>
                        <Button
                           type="button"
                           variant={"outline"}
                           onClick={() => handleModal("")}
                           // disabled={isLoading}
                           className="grow"
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
