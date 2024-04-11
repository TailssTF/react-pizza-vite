import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const PizzaDetails = lazy(
  () => import(/* webpackChunkName: "PizzaDetails" */ "./pages/PizzaDetails")
);

const App: React.FC = () => {
  return (
    <Routes>
      <Suspense fallback={<div>Идет загрузка...</div>}>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<PizzaDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Suspense>
    </Routes>
  );
};

export default App;
