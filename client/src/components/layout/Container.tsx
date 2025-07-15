import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

// SMALL NOTE:
// You can add a parameter called size to create a reusable component which would contain
// different screen sizes such as max-w-4xl when using size='small'

type ContainerProps = PropsWithChildren<{
   className?: string;
}>;

export const LayoutContainer: React.FC<ContainerProps> = ({ children, className }) => (
   <div className={cn("max-w-7xl mx-auto p-4", className)}>{children}</div>
);
