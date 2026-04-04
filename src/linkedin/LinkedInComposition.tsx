import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1Problem } from "../components/Scene1Problem";
import { Scene2Solution } from "../components/Scene2Solution";
import { Scene3AI } from "../components/Scene3AI";
import { Scene6RefCustoms } from "../components/Scene6RefCustoms";
import { Scene9Platform } from "../components/Scene9Platform";
import { Scene10Team } from "../components/Scene10Team";
import { CaptionsOverlay } from "./CaptionsOverlay";
import { LinkedInBar } from "./LinkedInBar";
import {
  LINKEDIN_SCENES,
  TRANSITION_DURATION,
  getSceneDuration,
  getLinkedInTotalDuration,
} from "./linkedInSceneConfig";

const T = TRANSITION_DURATION;

// Map scene index to React component
const SCENE_COMPONENTS = [
  Scene1Problem,
  Scene2Solution,
  Scene3AI,
  Scene6RefCustoms,
  Scene9Platform,
  Scene10Team,
] as const;

/**
 * Wraps a 1920x1080 scene to fit inside the upper portion of the 1080x1080 frame.
 * Scales to 1080x608 and positions at top.
 */
const SceneScaler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scale = 1080 / 1920; // 0.5625
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
};

export const LinkedInVideo: React.FC = () => {
  const totalDuration = getLinkedInTotalDuration();

  // Calculate cumulative start frames for audio/captions sync
  const sceneStarts: number[] = [0];
  for (let i = 1; i < LINKEDIN_SCENES.length; i++) {
    sceneStarts.push(sceneStarts[i - 1] + getSceneDuration(i - 1) - T);
  }

  return (
    <AbsoluteFill style={{ background: "#032633" }}>
      {/* Scene content layer — upper 608px area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 608,
          overflow: "hidden",
        }}
      >
        <TransitionSeries>
          {LINKEDIN_SCENES.map((scene, i) => {
            const SceneComp = SCENE_COMPONENTS[i];
            return (
              <React.Fragment key={scene.label}>
                {i > 0 && (
                  <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: T })}
                  />
                )}
                <TransitionSeries.Sequence
                  durationInFrames={getSceneDuration(i)}
                >
                  <SceneScaler>
                    <SceneComp />
                  </SceneScaler>
                </TransitionSeries.Sequence>
              </React.Fragment>
            );
          })}
        </TransitionSeries>
      </div>

      {/* Gradient separator between scene and captions */}
      <div
        style={{
          position: "absolute",
          top: 568,
          left: 0,
          width: 1080,
          height: 80,
          background:
            "linear-gradient(to bottom, transparent, #032633)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Captions area — below the scene, above the bar */}
      <div
        style={{
          position: "absolute",
          top: 608,
          left: 0,
          width: 1080,
          height: 372,
          overflow: "hidden",
        }}
      >
        {LINKEDIN_SCENES.map((scene, i) => {
          // Trim caption duration so adjacent scenes don't overlap during transitions
          const isLast = i === LINKEDIN_SCENES.length - 1;
          const captionDuration = getSceneDuration(i) - (isLast ? 0 : T);
          return (
            <Sequence
              key={scene.label}
              from={sceneStarts[i]}
              durationInFrames={captionDuration}
            >
              <CaptionsOverlay captionsFile={scene.captionsFile} />
            </Sequence>
          );
        })}
      </div>

      {/* Audio tracks */}
      {LINKEDIN_SCENES.map((scene, i) => (
        <Sequence
          key={`audio-${scene.label}`}
          from={sceneStarts[i]}
          durationInFrames={getSceneDuration(i)}
        >
          <Audio src={staticFile(scene.audioFile)} />
        </Sequence>
      ))}

      {/* Bottom bar */}
      <LinkedInBar totalFrames={totalDuration} />
    </AbsoluteFill>
  );
};
