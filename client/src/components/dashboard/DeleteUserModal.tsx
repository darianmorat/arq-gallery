import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Modal } from "./Modal";
import { useDashStore } from "@/stores/useDashStore";

type User = {
   id: string;
   name: string;
};

type DeleteUserModalProps = {
   handleModal: () => void;
   user: User;
};

export const DeleteUserModal = ({ handleModal, user }: DeleteUserModalProps) => {
   const { deleteUser } = useDashStore();

   return (
      <Modal>
         <div className="relative bg-background dark:bg-accent p-6 rounded-lg m-4 w-full max-w-100 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Eliminar usuario</h1>
            <p className="text-muted-foreground text-sm">
               Confirma que quiere eleminar el usuario{" "}
               <span className="font-bold">{user.name}</span>?
            </p>
            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={handleModal}
            >
               <X />
            </Button>
            <div className="flex gap-2 pt-2">
               <Button
                  variant={"default"}
                  type="submit"
                  onClick={() => {
                     (deleteUser(user.id), handleModal());
                  }}
                  // disabled={isLoading}
                  className="grow"
               >
                  Aceptar
               </Button>
               <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleModal}
                  // disabled={isLoading}
                  className="grow"
               >
                  Cancelar
               </Button>
            </div>
         </div>
      </Modal>
   );
};
