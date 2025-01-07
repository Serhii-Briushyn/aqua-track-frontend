import DocumentTitle from "../../components/DocumentTitle";
import Logo from "../../components/Logo/Logo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";

export default function TrackerPage() {
  return (
    <>
      <DocumentTitle>Tracker</DocumentTitle>
      <WaterMainInfo />
      <Logo />
      <WaterDetailedInfo />
    </>
  );
}
