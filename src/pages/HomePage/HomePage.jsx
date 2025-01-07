import DocumentTitle from "../../components/DocumentTitle";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <WelcomeSection />
      <Logo />
      <AdvantagesSection />
    </>
  );
}
