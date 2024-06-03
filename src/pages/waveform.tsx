import { Text } from "@/components/text";
import { useCacheContext } from "@/contexts/cache-context";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { CgSpinnerTwo } from "react-icons/cg";
import { mergeClasses } from "@/utils";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FaUndoAlt } from "react-icons/fa";
import CircularSlider from "@fseehawer/react-circular-slider";

export default function WaveformPage() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { audioFile } = useCacheContext();
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [surfer, setSurfer] = useState<WaveSurfer | null>(null);
  const [volume, setVolume] = useState<number>(50);
  const [playTime, setPlayTime] = useState(0);

  const handleRestart = () => {
    if (!surfer) return;
    surfer.stop();
    setPlaying(false);
    setPlayTime(0);
  };

  useEffect(() => {
    let audioUrl: string | null = null;

    if (audioFile && waveformRef.current /* && !surfer*/) {
      audioUrl = URL.createObjectURL(audioFile);

      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        url: audioUrl,
        barGap: 1,
        barWidth: 2,
        barRadius: 20,
        barHeight: 0.5,
        waveColor: "#4F4A85",
        progressColor: "#383351",
      });

      wavesurfer.on("ready", () => setReady(true));
      wavesurfer.on("finish", () => setPlaying(false));
      wavesurfer.on("timeupdate", (time) => setPlayTime(time));
      setSurfer(wavesurfer);
    } else if (!audioFile) {
      router.replace("/");
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        surfer?.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (surfer) {
      if (playing && !surfer.isPlaying()) {
        void surfer.play();
      } else if (!playing && surfer.isPlaying()) {
        void surfer.pause();
      }
    }
  }, [playing, surfer]);

  useEffect(() => {
    if (ready && surfer) {
      const normalizedVolume = Math.max(0, Math.min(1, volume / 100));
      surfer.setVolume(normalizedVolume);
    }
  }, [ready, surfer, volume]);

  return (
    <main className="w-full h-screen grid place-items-center p-8 bg-gray-50">
      <main className="w-full max-w-[768px] mx-auto flex flex-col items-center justify-center bg-white rounded-xl shadow-2xl border-[1px] border-gray-200 gap-4 p-8">
        <Text>Waveform Page</Text>

        {!ready && (
          <div className="flex items-center gap-4">
            <CgSpinnerTwo className="animate-spin" />
            <Text>Analyzing...</Text>
          </div>
        )}

        <div ref={waveformRef} className="w-full" />

        <div className="flex items-center gap-4">
          {ready && !playing && (
            <ControlButton hint="Play" onClick={() => setPlaying(true)}>
              <FaPlay size={24} color="#fff" />
            </ControlButton>
          )}

          {ready && playing && (
            <ControlButton hint="Pause" onClick={() => setPlaying(false)}>
              <FaPause size={24} color="#fff" />
            </ControlButton>
          )}

          {ready && playTime >= 0 && (
            <ControlButton hint="Restart" onClick={handleRestart} disabled={playTime === 0}>
              <FaUndoAlt size={24} color="#fff" />
            </ControlButton>
          )}

          {ready && (
            <CircularSlider
              width={72}
              min={0}
              max={100}
              dataIndex={50}
              label="Volume"
              trackSize={2}
              labelFontSize="10px"
              valueFontSize="10px"
              verticalOffset="0rem"
              onChange={(v: number) => setVolume(v)}
              useMouseAdditionalToTouch
            />
          )}
        </div>
      </main>
    </main>
  );
}

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hint: string;
}

function ControlButton({ className, children, hint, ...rest }: ControlButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className={mergeClasses(
          "grid place-items-center w-12 h-12 bg-sky-400 rounded-full shadow-lg disabled:bg-gray-200",
          className,
        )}
        {...rest}>
        {children}
      </button>

      <Text className="text-xs text-gray-400 font-medium">{hint}</Text>
    </div>
  );
}
