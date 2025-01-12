import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import DocumentTitle from "../../components/DocumentTitle";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function SignUpPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>SignUp</DocumentTitle>
      <SignUpForm />
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}
