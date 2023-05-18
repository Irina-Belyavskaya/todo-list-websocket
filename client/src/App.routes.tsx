import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return Cookies.get('jwt_token') ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={"/app"} />
    );
};

// ======= public route ======= //
    const PublicRoute: FC<{ element: any }> = ({element: Element}) => (
        <Suspense fallback={<div/>}>
            <Element/>
        </Suspense>
    );

// ======= pages ======= //
    const MainPage = React.lazy(() => import("app/main"));
    const AuthPage = React.lazy(() => import("app/auth"));

    const AppRoutes = () => {
        return (
            <Routes>
                <Route path={"/app/todos/*"} element={<PrivateRoute element={MainPage}/>}/>
                <Route path={"/app/*"} element={<PublicRoute element={AuthPage}/>}/>

                {/* DEFAULT */}
                <Route path='*' element={<Navigate to="/app/todos"/>}/>
            </Routes>
        );
    };

export default AppRoutes;