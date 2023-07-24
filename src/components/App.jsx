import { Route, Routes } from "react-router-dom";
import  Layout  from "./Layout";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="login" element={<LoginPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
