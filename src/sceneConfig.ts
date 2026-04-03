export const SCENE_DURATION = 600; // 20s at 30fps
export const SCENE_DURATION_LONG = 660; // 22s
export const TRANSITION_DURATION = 25;

export const SCENES = [
  { label: "Problem", duration: SCENE_DURATION },
  { label: "Solution", duration: SCENE_DURATION },
  { label: "AI", duration: SCENE_DURATION_LONG },
  { label: "Deadlines", duration: SCENE_DURATION },
  { label: "AI use cases", duration: SCENE_DURATION_LONG },
  { label: "Reference", duration: SCENE_DURATION },
  { label: "Reference", duration: SCENE_DURATION },
  { label: "Reference", duration: SCENE_DURATION },
  { label: "Platform", duration: SCENE_DURATION_LONG },
  { label: "Team", duration: SCENE_DURATION },
] as const;

/** Compute cumulative start frame for each scene (accounting for transition overlap) */
export function getSceneStarts(): number[] {
  const starts: number[] = [0];
  for (let i = 1; i < SCENES.length; i++) {
    starts.push(starts[i - 1] + SCENES[i - 1].duration - TRANSITION_DURATION);
  }
  return starts;
}

export function getTotalDuration(): number {
  const total = SCENES.reduce((sum, s) => sum + s.duration, 0);
  const overlap = (SCENES.length - 1) * TRANSITION_DURATION;
  return total - overlap;
}
