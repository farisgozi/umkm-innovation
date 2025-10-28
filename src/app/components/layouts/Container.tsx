"user client"

import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
     <div
      className={cn(

        "w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12","relative z-10",
        className
      )}
    >
      {children}
    </div>
  );
}