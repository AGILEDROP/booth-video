export const TRANSITION_DURATION = 25;

export const SCENES = [
  { label: "Problem", duration: 336 },      // 11.2s
  { label: "Solution", duration: 432 },     // 14.4s
  { label: "AI", duration: 384 },           // 12.8s
  { label: "Deadlines", duration: 336 },    // 11.2s
  { label: "AI use cases", duration: 432 }, // 14.4s
  { label: "Reference", duration: 384 },    // 12.8s
  { label: "Reference", duration: 384 },    // 12.8s
  { label: "Reference", duration: 384 },    // 12.8s
  { label: "Platform", duration: 480 },     // 16s
  { label: "Team", duration: 432 },         // 14.4s
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
