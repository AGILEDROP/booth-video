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
          {/* Scene 1: starts fully visible (no entrance animations) */}
          <TransitionSeries.Sequence durationInFrames={SCENES[0].duration}>
            <Scene1Problem skipAnimations />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[1].duration}>
            <Scene2Solution />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[2].duration}>
            <Scene3AI />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[3].duration}>
            <Scene4Deadlines />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[4].duration}>
            <Scene5AIUseCases />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[5].duration}>
            <Scene6RefCustoms />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[6].duration}>
            <Scene7RefToll />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[7].duration}>
            <Scene8RefCargo />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[8].duration}>
            <Scene9Platform />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={SCENES[9].duration}>
            <Scene10Team />
          </TransitionSeries.Sequence>

          {/* Loop: fade back to Scene 1 fully rendered (matches first frame) */}
          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence durationInFrames={60}>
            <Scene1Problem skipAnimations />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </div>

      {/* Persistent bottom bar — never moves */}
      <PersistentBar />
    </AbsoluteFill>
  );
};
