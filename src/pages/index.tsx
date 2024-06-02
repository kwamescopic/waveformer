import { APP_NAME } from "@/config";

export default function Home() {
  return (
    <main className="w-full h-screen grid place-items-center">
      <p>Hello {APP_NAME}</p>
    </main>
  );
}
