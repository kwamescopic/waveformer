import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface CacheContextProps {
  audioFile: File | null;
  setAudioFile: Dispatch<SetStateAction<File | null>>;
}

const CacheContext = createContext<CacheContextProps>(null as never);

interface CacheProviderProps {
  children: ReactNode;
}

export function CacheProvider({ children }: CacheProviderProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return <CacheContext.Provider value={{ audioFile, setAudioFile }}>{children}</CacheContext.Provider>;
}

export function useCacheContext() {
  return useContext(CacheContext);
}
