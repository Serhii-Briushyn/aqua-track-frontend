import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function SignInPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>Sign In</DocumentTitle>
      <SignInForm />
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}
