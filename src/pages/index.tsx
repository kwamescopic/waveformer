import { APP_AUTHOR, APP_NAME } from "@/config";
import { Text } from "@/components/text";
import { useDropzone } from "react-dropzone";
import { mergeClasses } from "@/utils";

export default function HomePage() {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone({
    accept: { "audio/mpeg": [".mp3"], "audio/ogg": [".ogg"] },
    onDrop: (accepted) => handleSelectFile(accepted),
    noClick: true,
    maxFiles: 1,
  });

  const handleSelectFile = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  return (
    <main className="w-full h-screen p-8 flex flex-col gap-4 items-center justify-center">
      <Text className="text-2xl" weight="light">
        Welcome to{" "}
        <Text
          as="span"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 !text-transparent bg-clip-text"
          weight="medium">
          {APP_NAME}
        </Text>
      </Text>

      <hr className="w-32" />

      <Text weight="light" className="text-sm">
        To get started, upload an audio file
      </Text>

      <div
        className={mergeClasses(
          "w-full sm:max-w-96 h-56 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl",
          isDragAccept
            ? "bg-green-50 border-green-200"
            : isDragReject
              ? "bg-red-50 border-red-200"
              : "bg-sky-50 border-sky-200",
          isDragActive && "animate-pulse",
        )}
        {...getRootProps()}>
        <input type="file" {...getInputProps()} hidden />

        <Text
          className={mergeClasses(isDragAccept ? "text-green-500" : isDragReject ? "text-red-500" : "text-sky-500")}>
          {isDragAccept ? (
            <>Drop File Here</>
          ) : isDragReject ? (
            <>File type is unsupported</>
          ) : (
            <>Drag &amp; Drop File Here</>
          )}
        </Text>

        <button className={mergeClasses("italic text-sm text-slate-500")} onClick={open}>
          or click here to select file
        </button>
      </div>

      <Text className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs">{APP_AUTHOR}</Text>
    </main>
  );
}
