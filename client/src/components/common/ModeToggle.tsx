import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

   const applyTheme = (themeToApply: string) => {
      const classList = document.documentElement.classList;
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      classList.remove("dark", "light");

      const effectiveTheme =
         themeToApply === "system"
            ? systemPrefersDark
               ? "dark"
               : "light"
            : themeToApply;

      classList.add(effectiveTheme);
      document.documentElement.setAttribute("data-theme", effectiveTheme);
   };

   useEffect(() => {
      localStorage.setItem("theme", theme);
      applyTheme(theme);

      if (theme === "system") {
         const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

         const handleChange = () => {
            applyTheme("system");
            console.log("theme changed"); // testing
         };

         darkMedia.addEventListener("change", handleChange);
         return () => darkMedia.removeEventListener("change", handleChange); // memory leaks, without this, handleChange is sent many times
      }
   }, [theme]);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
               <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
               <Sun /> Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
               <Moon /> Oscuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
               <Laptop /> Sistema
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
