import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { PersistentBar } from "./components/PersistentBar";
import { SCENES, TRANSITION_DURATION } from "./sceneConfig";

// Scenes
import { Scene1Problem } from "./components/Scene1Problem";
import { Scene2Solution } from "./components/Scene2Solution";
import { Scene3AI } from "./components/Scene3AI";
import { Scene4Deadlines } from "./components/Scene4Deadlines";
import { Scene5AIUseCases } from "./components/Scene5AIUseCases";
import { Scene6RefCustoms } from "./components/Scene6RefCustoms";
import { Scene7RefToll } from "./components/Scene7RefToll";
import { Scene8RefCargo } from "./components/Scene8RefCargo";
import { Scene9Platform } from "./components/Scene9Platform";
import { Scene10Team } from "./components/Scene10Team";

const T = TRANSITION_DURATION;

const SCENE_COMPONENTS = [
  Scene1Problem,
  Scene2Solution,
  Scene3AI,
  Scene4Deadlines,
  Scene5AIUseCases,
  Scene6RefCustoms,
  Scene7RefToll,
  Scene8RefCargo,
  Scene9Platform,
  Scene10Team,
];

export const ArpSoftwareDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#032633" }}>
      {/* Scene content — transitions only affect this layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <TransitionSeries>
          {SCENE_COMPONENTS.map((SceneComponent, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: T })}
                />
              )}
              <TransitionSeries.Sequence durationInFrames={SCENES[i].duration}>
                <SceneComponent />
              </TransitionSeries.Sequence>
            </React.Fragment>
          ))}
        </TransitionSeries>
      </div>

      {/* Persistent bottom bar — never moves */}
      <PersistentBar />
    </AbsoluteFill>
  );
};
