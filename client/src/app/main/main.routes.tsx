import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const MainPage = React.lazy(() => import("app/main/main.page"));

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={MainPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;