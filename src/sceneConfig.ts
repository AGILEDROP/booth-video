export const TRANSITION_DURATION = 25;

export const SCENES = [
  { label: "Problem", duration: 270 },      // 9s
  { label: "Solution", duration: 345 },     // 11.5s
  { label: "AI", duration: 308 },           // 10.3s
  { label: "Deadlines", duration: 270 },    // 9s
  { label: "AI use cases", duration: 345 }, // 11.5s
  { label: "Reference", duration: 308 },    // 10.3s
  { label: "Reference", duration: 308 },    // 10.3s
  { label: "Reference", duration: 308 },    // 10.3s
  { label: "Platform", duration: 384 },     // 12.8s
  { label: "Team", duration: 345 },         // 11.5s
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
