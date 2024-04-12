import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";

const {
  AuthStore: { isAuth, isAuthInProgress },
} = useStores();

const PrivateRoute = () => {
  if (isAuthInProgress) {
    return <div>Проверка авторизации...</div>;
  }
  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);
