import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
   return (
      <nav className="bg-slate-700 flex justify-between px-24 py-4">
         <p className="text-white">Logo Name</p>
         <div className="flex gap-4 items-center">
            <ModeToggle />
         </div>
      </nav>
   );
};
