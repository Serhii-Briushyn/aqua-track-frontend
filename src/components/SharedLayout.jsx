import { Outlet } from "react-router-dom";
import Logo from "./Logo/Logo";

export const SharedLayout = () => {
  return (
    <div className="shared-layout">
      <Logo />
      <Outlet />
    </div>
  );
};
