import type { PropsWithChildren } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "@/lib/utils";

type orientationSide = "center" | "right";

type ModalProps = PropsWithChildren<{
   className?: string;
   orientation?: orientationSide;
}>;

const orientationVariants = {
   center: "items-center justify-center",
   right: "justify-end",
};

export const Modal: React.FC<ModalProps> = ({
   children,
   className,
   orientation = "center",
}) => (
   <RemoveScroll>
      <div
         className={cn(
            "fixed inset-0 bg-black/50 flex z-10",
            className,
            orientationVariants[orientation],
         )}
      >
         {children}
      </div>
   </RemoveScroll>
);
