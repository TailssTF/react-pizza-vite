import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";

const PrivateRoute: React.FC = () => {
  const {
    AuthStore: { isAuth },
  } = useStores();

  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default observer(PrivateRoute);
