import dynamic from "next/dynamic";
import { EditorActions } from "./actions";
import { OpenedFilesTabs } from "./opened-files";

const MyEditor = dynamic(() => import("./editor").then((mod) => mod.Editor), {
  ssr: false,
});

export function EditorPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none h-12 flex">
        <OpenedFilesTabs />
        <EditorActions />
      </div>
      <div className="flex-auto overflow-auto">
        <MyEditor />
      </div>
    </div>
  );
}
