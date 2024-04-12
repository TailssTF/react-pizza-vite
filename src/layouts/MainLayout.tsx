import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/";

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Suspense fallback={<div>Идет загрузка...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
