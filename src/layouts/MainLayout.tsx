import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { StoreContext } from "../Store-context";
import Store from "../stores/Store";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <StoreContext.Provider value={new Store()}>
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </StoreContext.Provider>
    </div>
  );
};

export default MainLayout;
