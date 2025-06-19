import { useEffect, useState } from "react";

export const ThemeChanger = () => {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

   useEffect(() => {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
   }, [theme]);

   return (
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
         <option value="system">System</option>
         <option value="light">Light</option>
         <option value="dark">Dark</option>
      </select>
   );
};
