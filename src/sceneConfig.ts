export const TRANSITION_DURATION = 25;

export const SCENES = [
  { label: "Problem", duration: 420 },      // 14s — 4 stats, quick read
  { label: "Solution", duration: 540 },     // 18s — 3 staggered columns
  { label: "AI", duration: 480 },           // 16s — concise use cases + mock
  { label: "Deadlines", duration: 420 },    // 14s — simple timeline
  { label: "AI use cases", duration: 540 }, // 18s — 6 cards to absorb
  { label: "Reference", duration: 480 },    // 16s — customs ref
  { label: "Reference", duration: 480 },    // 16s — toll ref
  { label: "Reference", duration: 480 },    // 16s — cargo ref
  { label: "Platform", duration: 600 },     // 20s — complex architecture
  { label: "Team", duration: 540 },         // 18s — count-up animations
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
