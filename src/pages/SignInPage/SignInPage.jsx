import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import DocumentTitle from "../../components/DocumentTitle";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function SignInPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>SignIn</DocumentTitle>
      <SignInForm />
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}
