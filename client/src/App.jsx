import { Route, Routes } from "react-router-dom";
import { Default } from "./layouts/Default";
import { Minimal } from "./layouts/Minimal";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";

function App() {
   return (
      <Routes>
         <Route element={<Default />}>
            <Route path="/" element={<Home />} />
         </Route>
         <Route element={<Minimal />}>
            <Route path="/secret-login" element={<Login />} />
         </Route>
      </Routes>
   );
}

export default App;
