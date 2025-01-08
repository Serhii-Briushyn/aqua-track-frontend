import DocumentTitle from "../../components/DocumentTitle";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import { LeftSideWrapper, PageContainer, RightSideWrapper } from "../../components/PageContainer/index.js";


export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      {/*Page Container usage example   */}
      <PageContainer>
          <LeftSideWrapper>
            Your Left Side Screen Component
          </LeftSideWrapper>
          <RightSideWrapper>
             Your Right Side Screen Component
          </RightSideWrapper>
      </PageContainer>
      {/*Page Container usage example   */}

      <WelcomeSection />
      <Logo />
      <AdvantagesSection />
    </>
  );
}
