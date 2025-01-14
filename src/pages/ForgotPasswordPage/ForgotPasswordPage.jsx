import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import ForgetPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm.jsx";

export default function ForgetPasswordPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>Reset</DocumentTitle>
      <ForgetPasswordForm />
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}
