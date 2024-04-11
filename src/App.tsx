import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Userfront, {
  LoginForm,
  PasswordResetForm,
  SignupForm,
} from "@userfront/toolkit";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const PizzaDetails = lazy(
  () => import(/* webpackChunkName: "PizzaDetails" */ "./pages/PizzaDetails")
);

Userfront.init("8nwwqj9n");

const authTheme = {
  colors: {
    light: "#ffffff",
    dark: "#e4935e",
    accent: "#ffa914",
    lightBackground: "#fdfdfd",
    darkBackground: "#2d2d2d",
  },
  colorScheme: "light",
  fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  size: "compact",
  extras: { rounded: true, hideSecuredMessage: true },
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="auth" element={<LoginForm theme={authTheme} />} />
      <Route path="register" element={<SignupForm theme={authTheme} />} />
      <Route path="reset" element={<PasswordResetForm theme={authTheme} />} />
    </Routes>
  );
};

export default App;
