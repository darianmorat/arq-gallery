import { Navigate, Route, Routes } from "react-router-dom";
import { Default } from "./layouts/Default";
import { Minimal } from "./layouts/Minimal";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";
import { Dashboard } from "./pages/Admin";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { Profile } from "./pages/Profile";

function App() {
   const { isAuth, checkingAuth, checkAuth } = useAuthStore();
   const isAdmin = useIsAdmin();

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

   if (checkingAuth) {
      return <div>Loading...</div>;
   }

   return (
      <>
         <Routes>
            <Route element={<Default />}>
               <Route path="/" element={<Home />} />
               <Route
                  path="/admin"
                  element={isAuth && isAdmin ? <Dashboard /> : <Navigate to={"/"} />}
               />
               <Route
                  path="/profile"
                  element={isAuth ? <Profile /> : <Navigate to={"/"} />}
               />
            </Route>

            <Route element={<Minimal />}>
               <Route
                  path="/login"
                  element={isAuth ? <Navigate to={"/"} /> : <Login />}
               />
            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />
         </Routes>

         <ToastContainer
            theme="colored" // how to change dinamically with themeprovider
            autoClose={4000}
            position="top-right"
            transition={Bounce}
            pauseOnHover={false}
         />
      </>
   );
}

export default App;
