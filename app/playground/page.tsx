import { EditorCacheProvider } from "@tidbcloud/tisqleditor-react";
import { Panels } from "./panels";
import { QueryProvider } from "@/contexts/query-provider";
import { StatementProvider } from "@/contexts/statement-context-provider";
import { SchemaProvider } from "@/contexts/schema-context-provider";
import { FilesProvider } from "@/contexts/files-context-provider";
import { ChatProvider } from "@/contexts/chat-context-provider";

export default function Page() {
  return (
    <QueryProvider>
      <EditorCacheProvider>
          <StatementProvider>
            <SchemaProvider>
              <FilesProvider>
                <ChatProvider>
                  <main className="h-screen">
                    <Panels />
                  </main>
                </ChatProvider>
              </FilesProvider>
            </SchemaProvider>
          </StatementProvider>
      </EditorCacheProvider>
    </QueryProvider>
  );
}
