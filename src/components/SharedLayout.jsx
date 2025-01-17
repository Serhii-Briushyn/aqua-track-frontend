import { Outlet } from "react-router-dom";
import Logo from "./Logo/Logo";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

export const SharedLayout = () => {
  return (
    <div className="shared-layout">
      <Logo />
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
};
