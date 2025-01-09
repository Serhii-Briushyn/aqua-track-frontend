import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { PrivateRoute } from "./components/PrivateRoute";
// import { RestrictedRoute } from "./components/RestrictedRoute";
import { SharedLayout } from "./components/SharedLayout";
import Loader from "./components/Loader/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";
import UserSettingsForm from "./components/UserSettingsForm/UserSettingsForm";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  // const IsLoading = useSelector();

  return (
    <>
      {/* {IsLoading ? (
        <Loader />
      ) : ( */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="signup"
              element={<SignUpPage />}
              // element={
              //   <RestrictedRoute
              //     component={<SignUpPage />}
              //     redirectTo="/tracker"
              //   />
              // }
            />
            <Route
              path="signin"
              element={<SignInPage />}
              // element={
              //   <RestrictedRoute
              //     component={<SignInPage />}
              //     redirectTo="/tracker"
              //   />
              // }
            />
            <Route
              path="tracker"
              element={<TrackerPage />}
              // element={
              //   <PrivateRoute
              //     component={<TrackerPage />}
              //     redirectTo="/signin"
              //   />
              // }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="user-settings" element={<UserSettingsForm />} />
        </Routes>
      </Suspense>
      {/* )} */}
    </>
  );
}

export default App;
