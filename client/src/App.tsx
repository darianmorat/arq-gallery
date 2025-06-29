import { Route, Routes } from "react-router-dom";
import { Default } from "./layout/Default";
import { Minimal } from "./layout/Minimal";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {
   return (
      <Routes>
         <Route element={<Default />}>
            <Route path="/" element={<Home />} />
         </Route>
         <Route element={<Minimal />}>
            <Route path="/login" element={<Login />} />
         </Route>
      </Routes>
   );
}

export default App;
