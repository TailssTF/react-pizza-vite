import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { StoreContext } from "../Store-context";
import Store from "../stores/Store";
import { Header } from "../components/";

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <StoreContext.Provider value={new Store()}>
        <Header />
        <main className="content">
          <Suspense fallback={<div>Идет загрузка...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </StoreContext.Provider>
    </div>
  );
};

export default MainLayout;
