import type { PropsWithChildren } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "@/lib/utils";

type ModalProps = PropsWithChildren<{
   className?: string;
}>;

export const Modal: React.FC<ModalProps> = ({ children, className }) => (
   <RemoveScroll>
      <div
         className={cn(
            "fixed inset-0 bg-black/50 flex items-center justify-center",
            className,
         )}
      >
         {children}
      </div>
   </RemoveScroll>
);
