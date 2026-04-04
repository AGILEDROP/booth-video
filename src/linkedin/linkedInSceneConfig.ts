export const FPS = 30;
export const TRANSITION_DURATION = 20; // frames

// Each scene gets audio duration + small buffer for breathing room
// Durations are set after audio generation; these are derived from the manifest
export const LINKEDIN_SCENES = [
  {
    label: "Problem",
    audioFile: "voiceover/linkedin/scene-01-problem.mp3",
    captionsFile: "voiceover/linkedin/scene-01-problem-captions.json",
    audioDurationMs: 11053,
  },
  {
    label: "Solution",
    audioFile: "voiceover/linkedin/scene-02-solution.mp3",
    captionsFile: "voiceover/linkedin/scene-02-solution-captions.json",
    audioDurationMs: 14303,
  },
  {
    label: "AI",
    audioFile: "voiceover/linkedin/scene-03-ai.mp3",
    captionsFile: "voiceover/linkedin/scene-03-ai-captions.json",
    audioDurationMs: 13096,
  },
  {
    label: "Customs",
    audioFile: "voiceover/linkedin/scene-04-customs.mp3",
    captionsFile: "voiceover/linkedin/scene-04-customs-captions.json",
    audioDurationMs: 11935,
  },
  {
    label: "Platform",
    audioFile: "voiceover/linkedin/scene-05-platform.mp3",
    captionsFile: "voiceover/linkedin/scene-05-platform-captions.json",
    audioDurationMs: 11424,
  },
  {
    label: "Team",
    audioFile: "voiceover/linkedin/scene-06-team.mp3",
    captionsFile: "voiceover/linkedin/scene-06-team-captions.json",
    audioDurationMs: 11378,
  },
] as const;

/** Get scene duration in frames (audio + 0.5s buffer) */
export function getSceneDuration(index: number): number {
  const scene = LINKEDIN_SCENES[index];
  return Math.ceil((scene.audioDurationMs / 1000) * FPS) + 15; // +0.5s buffer
}

/** Total duration accounting for transition overlaps */
export function getLinkedInTotalDuration(): number {
  const total = LINKEDIN_SCENES.reduce(
    (sum, _, i) => sum + getSceneDuration(i),
    0,
  );
  const overlap = (LINKEDIN_SCENES.length - 1) * TRANSITION_DURATION;
  return total - overlap;
}
