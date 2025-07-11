import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
   email: z.string().email({ message: "Email invalido" }),
   password: z.string().min(1, { message: "Contraseña invalida" }),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
   const [showPassword, setShowPassword] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const { authenticate, isLoading } = useAuthStore();

   function onSubmit(values: z.infer<typeof formSchema>) {
      authenticate(values.email, values.password);
      // form.reset();
   }

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   return (
      <Form {...form}>
         <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <div className="flex flex-col items-center gap-2 text-center">
               <h1 className="text-2xl font-bold">Inicio de sesion</h1>
               <p className="text-muted-foreground text-sm text-balance">
                  Ingresa tu correo y contrasena para continuar
               </p>
            </div>
            <div className="grid gap-6">
               <FormField
                  control={form.control}
                  name="email"
                  disabled={isLoading}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input placeholder="jhon@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  disabled={isLoading}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 placeholder="* * * * * * * *"
                                 {...field}
                              />
                              <Button
                                 type="button"
                                 variant={"ghost"}
                                 className="absolute right-0 top-0 text-muted-foreground"
                                 onClick={() => toggleShowPassword()}
                                 disabled={isLoading}
                              >
                                 {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                              </Button>
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando Sesion..." : "Inicio Sesion"}
               </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
               <span className="bg-background text-muted-foreground relative z-10 px-2"></span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
               © 2025 Arq Gallery.
               <br /> Todos los derechos reservados.
            </div>
         </form>
      </Form>
   );
}
