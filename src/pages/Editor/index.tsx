import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import SplitPane from "react-split-pane";

const CodeEditor = () => {
  const [content, setContent] = useState(`
  
  `);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJS] = useState("");

  const handleEditorDidMount = () => {
    emmetHTML((window as unknown as any).monaco);
    emmetCSS((window as unknown as any).monaco);
  };

  const generate = (html: string, css: string, js: string) => {
    return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Problem 27</title>
      </head>
      <body>
        ${html}
        ${css && `<style>${css}</style>`}
        ${js && `<script>${css}</script>`}
      </body>
    </html>`;
  };

  return (
    <div className="h-full bg-zinc-900 min-h-screen w-full flex justify-between gap-2">
      <SplitPane
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={"50%"}
        className="w-full p-2 h-full flex flex-row gap-2"
      >
        <section className="w-full h-full">
          <Tabs defaultValue="html" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JS</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="w-full h-full">
              <Editor
                theme="vs-dark"
                height="92vh"
                defaultLanguage="html"
                onMount={handleEditorDidMount}
                onChange={(e) => {
                  setHtml(e ?? "");
                }}
                value={html}
                defaultValue="<!-- some comment -->"
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="css">
              <Editor
                theme="vs-dark"
                height="92vh"
                defaultLanguage="css"
                onChange={(e) => {
                  setCss(e ?? "");
                }}
                value={css}
                defaultValue="/* some comment */"
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="js">
              <Editor
                theme="vs-dark"
                height="92vh"
                defaultLanguage="javascript"
                onChange={(e) => {
                  setJS(e ?? "");
                }}
                value={js}
                defaultValue="// some comment"
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            </TabsContent>
          </Tabs>
        </section>
        <section className="w-full h-full min-h-[90vh] bg-zinc-800">
          <iframe srcDoc={generate(html, css, js)}></iframe>
        </section>
      </SplitPane>
    </div>
  );
};

export default CodeEditor;
