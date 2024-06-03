import "@/styles/global.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@/contexts/cache-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
