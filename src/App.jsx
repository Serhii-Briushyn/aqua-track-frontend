import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { SharedLayout } from "./components/SharedLayout";
import Loader from "./components/Loader/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { startTokenRefreshInterval } from "./utils/tokenRefresh";

import { selectIsLoading } from "./redux/auth/selectors";

import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  const IsLoading = useSelector(selectIsLoading);

  useEffect(() => {
    startTokenRefreshInterval();
  }, []);

  return IsLoading ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="signin"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="tracker"
              element={
                <PrivateRoute
                  component={<TrackerPage />}
                  redirectTo="/signin"
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
