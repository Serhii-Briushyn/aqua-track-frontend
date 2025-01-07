// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";

// import { PrivateRoute } from "./components/PrivateRoute";
// import { RestrictedRoute } from "./components/RestrictedRoute";
// import { SharedLayout } from "./components/SharedLayout";
// import Loader from "./components/Loader/Loader";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
// const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
// const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));
import TrackerPage from "./pages/TrackerPage/TrackerPage";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const App = () => {
  return (
    <div>
      App
      <TrackerPage />
      <SignInPage />
      <SignUpPage />
      <HomePage />
    </div>
  );
};

// function App() {
//   const IsLoading = useSelector(selectIsLoading);

//   return IsLoading ? (
//     <Loader />
//   ) : (
//     <>
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route path="/" element={<SharedLayout />}>
//             <Route index element={<HomePage />} />
//             <Route
//               path="signup"
//               element={
//                 <RestrictedRoute
//                   component={<SignUpPage />}
//                   redirectTo="/tracker"
//                 />
//               }
//             />
//             <Route
//               path="signin"
//               element={
//                 <RestrictedRoute
//                   component={<SignInPage />}
//                   redirectTo="/tracker"
//                 />
//               }
//             />
//             <Route
//               path="tracker"
//               element={
//                 <PrivateRoute
//                   component={<TrackerPage />}
//                   redirectTo="/signin"
//                 />
//               }
//             />
//           </Route>
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

export default App;
