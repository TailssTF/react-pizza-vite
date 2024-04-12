import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import { observer } from "mobx-react-lite";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const PizzaDetails = lazy(
  () => import(/* webpackChunkName: "PizzaDetails" */ "./pages/PizzaDetails")
);

const App: React.FC = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="auth" element={<Auth />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<Reset />} />
    </Routes>
  );
});

export default App;
