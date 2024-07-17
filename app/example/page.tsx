import dynamic from "next/dynamic";

// https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
// use dynamic load to resolve compile error when running `next build`

// editor-example must have default export when it's imported dynamically
const EditorExample = dynamic(() => import("./editor-example"), { ssr: false });

export default function Page({
  searchParams,
}: {
  searchParams?: {
    ex?: string;
    theme?: string;
  };
}) {
  return (
    <main className="h-screen">
      <EditorExample example={searchParams?.ex} theme={searchParams?.theme} />
    </main>
  );
}
