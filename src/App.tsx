import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import "./scss/app.scss";
import { StoreContext } from "./Store-context";
import Store from "./stores/Store";

function App() {
  return (
    <div className="wrapper">
      <StoreContext.Provider value={new Store()}>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
