import dynamic from "next/dynamic";

// editor-example must have default export when it's imported dynamically
const EditorExample = dynamic(() => import("./editor-example"), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen">
      <EditorExample />
    </main>
  );
}
