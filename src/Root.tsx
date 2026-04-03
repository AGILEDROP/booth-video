import "./index.css";
import { Composition } from "remotion";
import { ArpSoftwareDemo } from "./Composition";
import { getTotalDuration } from "./sceneConfig";

const TOTAL_DURATION = getTotalDuration();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ArpSoftwareDemo"
        component={ArpSoftwareDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
