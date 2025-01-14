import { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { startTokenRefreshInterval } from "../../utils/tokenRefresh";

export default function TrackerPage() {
  useEffect(() => {
    startTokenRefreshInterval();
  }, []);

  return (
    <>
      <DocumentTitle>AquaTrack</DocumentTitle>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
}
