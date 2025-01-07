import DocumentTitle from "../../components/DocumentTitle";
import SignInForm from "../../components/SignInForm/SignInForm";
import Logo from "../../components/Logo/Logo";

export default function SignInPage() {
  return (
    <>
      <DocumentTitle>SignIn</DocumentTitle>
      <SignInForm />
      <Logo />
    </>
  );
}
