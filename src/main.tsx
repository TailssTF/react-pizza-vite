import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { StoreContext } from "./Store-context";
import Store from "./stores/Store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={new Store()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
