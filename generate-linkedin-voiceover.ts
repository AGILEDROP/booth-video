import { writeFileSync, mkdirSync } from "fs";
import type { Caption } from "@remotion/captions";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
  throw new Error("ELEVENLABS_API_KEY not set");
}

// Professional male voice — "George" (British, narrative)
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_multilingual_v2";

const OUTPUT_DIR = "public/voiceover/linkedin";

interface SceneVoiceover {
  id: string;
  text: string;
}

const scenes: SceneVoiceover[] = [
  {
    id: "scene-01-problem",
    text: "Ninety-nine percent of transport documents in Europe are still on paper. Five hundred million paper CMR notes printed every year. The EU says this ends in twenty twenty-seven.",
  },
  {
    id: "scene-02-solution",
    text: "We build the software that makes it happen. Integration middleware connecting legacy systems. Electronic freight document platforms replacing paper. And custom logistics modules — all fully owned by you, with no vendor lock-in.",
  },
  {
    id: "scene-03-ai",
    text: "Our AI agents process shipping documents with over ninety-nine percent accuracy, detect events in real time, and bridge legacy systems automatically. Every action is logged. Every decision is reviewable.",
  },
  {
    id: "scene-04-customs",
    text: "See it in action. Our customs declaration platform handles thousands of cross-border filings for government clients — delivering one hundred percent accurate declarations with zero port delays.",
  },
  {
    id: "scene-05-platform",
    text: "The ARP platform is a layered architecture you fully own. From custom business logic and AI tools down to open-source foundations — deployed on your cloud or on-premise.",
  },
  {
    id: "scene-06-team",
    text: "Eighty engineers. Five hundred projects delivered since twenty thirteen. Trusted by Deutsche Telekom, UNESCO, and the European Commission. This is ARP Software, by Agiledrop.",
  },
];

interface ElevenLabsAlignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

interface ElevenLabsTimestampResponse {
  audio_base64: string;
  alignment: ElevenLabsAlignment;
}

function alignmentToCaptions(alignment: ElevenLabsAlignment): Caption[] {
  const captions: Caption[] = [];
  let wordStart = -1;
  let wordEnd = -1;
  let wordChars: string[] = [];

  for (let i = 0; i < alignment.characters.length; i++) {
    const char = alignment.characters[i];
    const startTime = alignment.character_start_times_seconds[i];
    const endTime = alignment.character_end_times_seconds[i];

    if (char === " " || char === "\n") {
      // End of a word
      if (wordChars.length > 0) {
        captions.push({
          text: (captions.length > 0 ? " " : "") + wordChars.join(""),
          startMs: wordStart * 1000,
          endMs: wordEnd * 1000,
          timestampMs: wordStart * 1000,
          confidence: 1,
        });
        wordChars = [];
        wordStart = -1;
        wordEnd = -1;
      }
    } else {
      if (wordStart === -1) {
        wordStart = startTime;
      }
      wordEnd = endTime;
      wordChars.push(char);
    }
  }

  // Flush last word
  if (wordChars.length > 0) {
    captions.push({
      text: (captions.length > 0 ? " " : "") + wordChars.join(""),
      startMs: wordStart * 1000,
      endMs: wordEnd * 1000,
      timestampMs: wordStart * 1000,
      confidence: 1,
    });
  }

  return captions;
}

async function generateScene(scene: SceneVoiceover): Promise<{
  durationMs: number;
  captions: Caption[];
}> {
  console.log(`Generating: ${scene.id}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs API error for ${scene.id}: ${response.status} ${errorText}`,
    );
  }

  const data = (await response.json()) as ElevenLabsTimestampResponse;

  // Write audio
  const audioBuffer = Buffer.from(data.audio_base64, "base64");
  writeFileSync(`${OUTPUT_DIR}/${scene.id}.mp3`, audioBuffer);
  console.log(`  Audio: ${scene.id}.mp3 (${audioBuffer.length} bytes)`);

  // Convert alignment to captions
  const captions = alignmentToCaptions(data.alignment);

  // Write captions
  writeFileSync(
    `${OUTPUT_DIR}/${scene.id}-captions.json`,
    JSON.stringify(captions, null, 2),
  );
  console.log(`  Captions: ${scene.id}-captions.json (${captions.length} words)`);

  // Calculate duration from last caption
  const lastCaption = captions[captions.length - 1];
  const durationMs = lastCaption ? lastCaption.endMs : 0;
  console.log(`  Duration: ${(durationMs / 1000).toFixed(2)}s`);

  return { durationMs, captions };
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const results: { id: string; durationMs: number }[] = [];

  for (const scene of scenes) {
    const { durationMs } = await generateScene(scene);
    results.push({ id: scene.id, durationMs });
  }

  // Write a manifest with durations
  const manifest = {
    scenes: results.map((r) => ({
      id: r.id,
      durationMs: r.durationMs,
      audioFile: `voiceover/linkedin/${r.id}.mp3`,
      captionsFile: `voiceover/linkedin/${r.id}-captions.json`,
    })),
    totalDurationMs: results.reduce((sum, r) => sum + r.durationMs, 0),
  };

  writeFileSync(
    `${OUTPUT_DIR}/manifest.json`,
    JSON.stringify(manifest, null, 2),
  );

  console.log("\n=== Summary ===");
  console.log(`Total scenes: ${results.length}`);
  console.log(
    `Total audio duration: ${(manifest.totalDurationMs / 1000).toFixed(2)}s`,
  );
  console.log(`Manifest: ${OUTPUT_DIR}/manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
