import { Text } from "@/components/text";
import { useCacheContext } from "@/contexts/cache-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaveformPage() {
  const router = useRouter();
  const { audioFile } = useCacheContext();

  useEffect(() => {
    if (!audioFile) router.replace("/");
  }, [audioFile, router]);

  return (
    <main className="w-full h-screen grid place-items-center">
      <Text>Waveform Page</Text>
    </main>
  );
}
