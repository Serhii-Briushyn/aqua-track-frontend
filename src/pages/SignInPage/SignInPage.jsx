import Logo from "../../components/Logo/Logo";
import css from "./SignInPage.module.css";
import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function SignInPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <div className={css.signInSection}>
      <div className={css.container}>
        <Logo />
        <SignInForm />
      </div>
      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
}
