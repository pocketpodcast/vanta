import { Composition, Sequence, AbsoluteFill } from "remotion";

// ==========================================
// [FIXED] - Core Engine & Advanced Effects Library Imports
// ==========================================
import { AdvancedSceneRenderer } from "./engine/AdvancedSceneRenderer";
import { GlitchTransition } from "./effects/GlitchTransition";
import { ColorGradingFilter } from "./effects/ColorGradingFilter";

export const AdvancedRemotionRoot: React.FC = () => {
  // ==========================================
  // [FIXED] - Advanced Payload / JSON Security Reader
  // ==========================================
  let payload: any = {};
  try {
    const rawPayload = process.env.REMOTION_INPUT_PROP || "{}";
    payload = JSON.parse(rawPayload);
  } catch (e) {
    payload = {};
  }

  // ==========================================
  // [CHANGEABLE] - Advanced Dynamic Properties from Payload
  // Yeh har advanced video ke sath poori tarah badal jayenge
  // ==========================================
  const activeScenes = payload.scenes || [
    { type: "CinematicZoom", duration: 90, imageUrl: "", title: "Default" }
  ]; // [CHANGEABLE] - Kaun kaun se scenes aane hain aur kis kram me aane hain
  
  const globalTheme = payload.theme || "cyberpunk"; // [CHANGEABLE] - Color theme (cyberpunk, minimal, dark)
  const enableGlitch = payload.glitchEffect ?? true;  // [CHANGEABLE] - Special FX switch
  const totalDuration = activeScenes.reduce((acc, scene) => acc + scene.duration, 0); // [CHANGEABLE] - Total video length

  return (
    <>
      {/* ========================================== */}
      {/* [FIXED] - Master Advanced Composition Container */}
      {/* ========================================== */}
      <Composition
        id="AdvancedCustomVideo"
        component={() => (
          <AbsoluteFill style={{ backgroundColor: globalTheme === "cyberpunk" ? "#0f051d" : "#000" }}>
            
            {/* [CHANGEABLE] - Dynamic Scene Sequence Loop */}
            {activeScenes.map((sceneConfig: any, index: number) => {
              const startFrame = activeScenes.slice(0, index).reduce((acc: number, s: any) => acc + s.duration, 0);
              
              return (
                <Sequence key={index} from={startFrame} durationInFrames={sceneConfig.duration}>
                  {/* [CHANGEABLE] - Advanced Scene Renderer handles custom layers, images & text */}
                  <AdvancedSceneRenderer 
                    type={sceneConfig.type} 
                    imageUrl={sceneConfig.imageUrl} 
                    title={sceneConfig.title} 
                    animationStyle={sceneConfig.animationStyle}
                  />
                </Sequence>
              );
            })}

            {/* [CHANGEABLE] - Conditional Advanced FX Overlay */}
            {enableGlitch && <GlitchTransition />}

            {/* [FIXED] - Global Color Grading Filter Layer */}
            <ColorGradingFilter theme={globalTheme} />

          </AbsoluteFill>
        )}
        durationInFrames={totalDuration > 0 ? totalDuration : 300} // [CHANGEABLE] - Dynamic total frames
        fps={30}       // [FIXED]
        width={1920}   // [FIXED]
        height={1080}  // [FIXED]
      />
    </>
  );
};
