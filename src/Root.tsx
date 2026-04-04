import "./index.css";
import { Composition } from "remotion";
import { ArpSoftwareDemo } from "./Composition";
import { getTotalDuration } from "./sceneConfig";
import { LinkedInVideo } from "./linkedin/LinkedInComposition";
import { getLinkedInTotalDuration } from "./linkedin/linkedInSceneConfig";

const TOTAL_DURATION = getTotalDuration();
const LINKEDIN_DURATION = getLinkedInTotalDuration();

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
      <Composition
        id="LinkedInVideo"
        component={LinkedInVideo}
        durationInFrames={LINKEDIN_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
