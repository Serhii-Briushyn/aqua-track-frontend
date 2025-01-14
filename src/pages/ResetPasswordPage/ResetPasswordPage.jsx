import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm.jsx";

export default function ResetPasswordPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>Reset</DocumentTitle>
      <ResetPasswordForm />
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}
