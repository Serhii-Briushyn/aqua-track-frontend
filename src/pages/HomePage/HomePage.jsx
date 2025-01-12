import DocumentTitle from "../../components/DocumentTitle";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
    </>
  );
}
