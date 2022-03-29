import React from "react";
import { Outlet } from "react-router-dom"; // nest children

const Layout = () => {
  return (
    <div>
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
