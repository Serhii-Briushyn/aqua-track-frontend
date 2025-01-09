import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";

export default function TrackerPage() {
  return (
    <>
      <DocumentTitle>Tracker</DocumentTitle>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
}
