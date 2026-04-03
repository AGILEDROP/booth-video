# arp.software — Booth Video

Looping video for TV screen at booth, built with [Remotion](https://www.remotion.dev/).

**Format:** 1920x1080, 30fps, ~3.2 minutes per loop
**Scenes:** 10 scenes with crossfade transitions

## Scenes

| # | Title | Content |
|---|-------|---------|
| 1 | The problem | 99% paper documents, EU deadline July 2027 |
| 2 | What we build | Integration middleware, eFTI platforms, custom modules |
| 3 | AI that actually works | Document processing, event detection, system bridging |
| 4 | Regulatory wave | Three deadlines: Jul 2026, Jul 2027, Jan 2028 |
| 5 | AI use cases | 6 concrete AI applications with metrics |
| 6 | Customs declaration platform | Reference: Ireland/UK government customs |
| 7 | 24toll | Reference: Real-time toll processing, Netherlands |
| 8 | Cargo platform transformation | Reference: CertiFlow, Luxembourg government |
| 9 | The platform | arp.software architecture and ownership model |
| 10 | The team | Stats, client logos, team photo |

## Getting started

```bash
# Install dependencies
npm install

# Start the Remotion Studio (dev server with live preview)
npm run dev

# Open http://localhost:3000 in your browser
```

## Rendering

```bash
# Render the full video as MP4
npx remotion render ArpSoftwareDemo out/video.mp4

# Render a still frame (e.g. frame 550 = end of Scene 1)
npx remotion still ArpSoftwareDemo --frame=550 --output=stills/scene1.png
```

## Project structure

```
src/
  Root.tsx              # Remotion entry point, composition config
  Composition.tsx       # Main composition, wires up all 10 scenes
  sceneConfig.ts        # Scene durations and timing
  components/
    PersistentBar.tsx    # Bottom bar with progress tracker
    BrowserFrame.tsx     # Reusable tilted browser mockup wrapper
    AgiledropNoiseBg.tsx # Noise gradient background
    Scene1Problem.tsx    # Scene components (1-10)
    Scene2Solution.tsx
    ...
public/
  logos/                 # Client logos (SVG/PNG)
  *.jpg                  # Team photos
  *.png                  # Screenshots
```

## Tech stack

- [Remotion](https://www.remotion.dev/) 4.x
- React 19
- TypeScript
- Google Fonts (Montserrat + Nunito)
