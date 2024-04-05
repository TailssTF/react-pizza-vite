import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import "./scss/app.scss";
import { StoreContext } from "./Store-context";
import Store from "./stores/Store";

interface SearchState {
  searchValue: string;
  setSearchValue: (s: string) => void;
}

export const SearchContext = createContext<SearchState>({
  searchValue: "",
  setSearchValue: () => {},
});

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="wrapper">
      <StoreContext.Provider value={new Store()}>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </SearchContext.Provider>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
