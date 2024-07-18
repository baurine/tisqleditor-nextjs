import { Github, Fullscreen } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExampleSelect } from "./example-select";
import { EditorThemeSelect } from "./editor-theme-select";

// editor-example must have default export when it's imported dynamically
const EditorExample = dynamic(() => import("../example/editor-example"), {
  ssr: false,
});

export default function Page({
  searchParams,
}: {
  searchParams?: {
    ex?: string;
    theme?: string;
  };
}) {
  const ex = searchParams?.ex ?? "";
  const editorTheme = searchParams?.theme ?? "oneDark";

  const showOutputBox = ex === "events" || ex === "all";

  return (
    <main className="flex h-screen place-items-center justify-center p-4">
      <div className="max-w-7xl min-w-[800px]">
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            TiSQLEditor
          </h1>

          <div className="mt-10 flex items-center gap-1">
            <ExampleSelect />
            <EditorThemeSelect />
            <Button variant="ghost" size="icon">
              <a
                href={`/example?ex=${ex}&theme=${editorTheme}`}
                target="_blank"
              >
                <Fullscreen className="h-4 w-4" />
              </a>
            </Button>

            <div className="mr-auto"></div>

            <Button variant="outline">
              <a href={`/?`} target="_blank">
                Playground
              </a>
            </Button>
            <Button variant="ghost" size="icon">
              <a
                href="https://github.com/tidbcloud/tisqleditor"
                target="_blank"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div
            className={cn(
              "mt-2 text-left",
              showOutputBox ? "h-[600px]" : "h-[400px]"
            )}
          >
            <EditorExample example={ex} theme={editorTheme} withSelect={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
