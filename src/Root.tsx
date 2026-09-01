import { Composition } from "remotion";
import { VantaShowcase } from "./scenes/VantaShowcase";
import { ParticleScene } from "./scenes/ParticleScene";
import { KineticText } from "./scenes/KineticText";
import { DataVizScene } from "./scenes/DataVizScene";
import { WaveformScene } from "./scenes/WaveformScene";

export const RemotionRoot: React.FC = () => {
  // 1. GitHub Actions / Environment se JSON Payload read karna
  let payload: any = {};
  try {
    const rawPayload = process.env.REMOTION_INPUT_PROP || "{}";
    payload = JSON.parse(rawPayload);
  } catch (e) {
    payload = {};
  }

  // 2. Dynamic values jo JSON se aayengi (fallback ke sath)
  const customText = payload.text || "AUTO VIDEO";
  const customSubtitle = payload.subtitle || "Powered by Vanta & GitHub Actions";

  return (
    <>
      {/* 1. Vanta Showcase Scene */}
      <Composition
        id="VantaShowcase"
        component={VantaShowcase}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Particles Scene */}
      <Composition
        id="Particles"
        component={ParticleScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3. Kinetic Text Scene (Dynamic JSON Props connected) */}
      <Composition
        id="KineticText"
        component={KineticText}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ 
          text: customText, 
          subtitle: customSubtitle 
        }}
      />

      {/* 4. Data Viz Scene */}
      <Composition
        id="DataViz"
        component={DataVizScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 5. Waveform Scene */}
      <Composition
        id="Waveform"
        component={WaveformScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
