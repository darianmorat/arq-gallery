import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Modal } from "./Modal";
import { usePostStore } from "@/stores/usePostStore";
import { useNavigate } from "react-router-dom";

type Post = {
   id: string;
   title: string;
};

type DeletePostModalProps = {
   handleModal: () => void;
   post: Post;
};

export const DeletePostModal = ({ handleModal, post }: DeletePostModalProps) => {
   const { deletePost } = usePostStore();
   const navigate = useNavigate();

   const handleDelete = (postId: string) => {
      deletePost(postId);
      navigate("/");
   };

   return (
      <Modal>
         <div className="relative bg-background dark:bg-accent p-6 rounded-lg m-4 w-full max-w-100 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Eliminar publicación</h1>
            <p className="text-muted-foreground text-sm">
               Confirma que quiere eliminar{" "}
               <span className="font-bold">{post.title}</span>?
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
                     handleDelete(post.id);
                     handleModal();
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
