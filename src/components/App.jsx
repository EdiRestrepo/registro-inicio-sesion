import { Route, Routes } from "react-router-dom";
import  Layout  from "./Layout";
import { lazy, useEffect } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const TransactiosPage = lazy(() => import("../pages/Transactions"));
const CreateTransactiosPage = lazy(() => import("../pages/CreateTransaction"));


function App() {
  const dispath = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispath(refreshUser(token))
    }
  }, [dispath, token])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo="/transactions"
              component={<HomePage />}
            />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/transactions"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute
              redirectTo="/transactions"
              component={<LoginPage />}
            />
          }
        />
        <Route
          path="transactions"
          element={
            <PrivateRoute redirectTo="/" component={<TransactiosPage />} />
          }
        />
        <Route
          path="create-transactions"
          element={
            <PrivateRoute
              redirectTo="/"
              component={<CreateTransactiosPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
