import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { LeftPanel } from "./left-panel";
import { EditorPanel } from "./editor-panel";
import { ResultPanel } from "./result-panel";

export function Panels() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={15} maxSize={30}>
        <LeftPanel />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75} minSize={5}>
            <EditorPanel />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25} minSize={5}>
            <ResultPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
