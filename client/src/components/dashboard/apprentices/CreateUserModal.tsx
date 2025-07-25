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
import { User, Mail, Lock, X, Eye, EyeOff, AtSign, Phone } from "lucide-react";
import { useState } from "react";
import { Modal } from "../Modal";
import { useUserStore } from "@/stores/useUserStore";

// PENDING:
// WE SHOULD NOT CLOSE THE MODAL WHEN THE USERNAME OR EMAIL IS ALREADY IN USE, WE
// SHOULD INSTEAD JUST SHOW THE NOTIFICATION AND KEEP IT OPEN

type CreateUserModalProps = {
   handleModal: (modal: string) => void;
};

const formSchema = z.object({
   name: z
      .string()
      .min(4, { message: "Mínimo 4 caracteres" })
      .max(50, { message: "Máximo 50 caracteres" }),

   username: z
      .string()
      .min(4, { message: "Mínimo 4 caracteres" })
      .max(30, { message: "Máximo 30 caracteres" })
      .transform((val) => val.toLowerCase()),

   phone: z
      .string()
      .min(10, { message: "Teléfono inválido" })
      .max(10, { message: "Máximo 10 caracteres" })
      .regex(/^\+?[0-9\s-]+$/, { message: "Formato de teléfono inválido" }),

   email: z
      .string()
      .email({ message: "Email inválido" })
      .max(255, { message: "Máximo 255 caracteres" }),

   password: z
      .string()
      .min(1, { message: "Contraseña inválida" })
      .max(60, { message: "Máximo 60 caracteres" }),
});

export const CreateUserModal = ({ handleModal }: CreateUserModalProps) => {
   const [showPassword, setShowPassword] = useState(false);
   const { createUser } = useUserStore();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         username: "",
         phone: "",
         email: "",
         password: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      createUser(
         values.name,
         values.username,
         values.phone,
         values.email,
         values.password,
      );
      handleModal("");
      form.reset();
   }

   const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
   };

   return (
      <Modal orientation="right">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="relative flex flex-col justify-between bg-background dark:bg-accent w-full sm:w-lg h-full overflow-y-auto">
                  <div className="p-6 bg-accent border-b-1 sticky top-0 z-10">
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
                  </div>
                  <div className="p-6 flex-1">
                     <div className="grid gap-4">
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
                           name="username"
                           // disabled={isLoading}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Usuario</FormLabel>
                                 <FormControl>
                                    <div className="relative">
                                       <AtSign
                                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                          size={18}
                                       />
                                       <Input
                                          placeholder="jhon06_"
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
                           name="phone"
                           // disabled={isLoading}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Teléfono</FormLabel>
                                 <FormControl>
                                    <div className="relative">
                                       <Phone
                                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                          size={18}
                                       />
                                       <Input
                                          placeholder="111-111-111"
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
                                             showPassword ? "Contraseña" : "••••••••"
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
