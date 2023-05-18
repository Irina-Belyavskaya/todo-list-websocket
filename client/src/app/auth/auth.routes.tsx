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
const AuthSignUpPage = React.lazy(() => import("app/auth/auth-sign-up.page"));
const AuthSignInPage = React.lazy(() => import("app/auth/auth-sign-in.page"));
const AuthLogOutPage = React.lazy(() => import("app/auth/auth-log-out.page"));

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"auth/sign-up"} element={<Suspended element={AuthSignUpPage} />} />
      <Route path={"auth/sign-in"} element={<Suspended element={AuthSignInPage} />} />
      <Route path={"auth/log-out"} element={<Suspended element={AuthLogOutPage} />} />
      <Route path={"/"} element={<Suspended element={AuthSignInPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRoutes;
