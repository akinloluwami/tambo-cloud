"use client";

import { Section } from "@/components/section";
import { clsx } from "clsx";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/stackoverflow-light.css";
import {
  Code,
  FileCode,
  FileJson,
  MonitorIcon,
  PackageIcon,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

hljs.registerLanguage("typescript", typescript);

type TabKey = "register" | "input" | "render" | "state" | "tools" | "mcp";

// File information for each code example
const fileInfo: Record<
  TabKey,
  { filename: string; icon: React.ReactNode; description: string }
> = {
  register: {
    filename: "registerGenUI.tsx",
    icon: <PackageIcon className="w-4 h-4" />,
    description: "Register components with TamboProvider",
  },
  input: {
    filename: "sendMessage.tsx",
    icon: <Code className="w-4 h-4" />,
    description: "Handle user input and message sending",
  },
  render: {
    filename: "renderGenUI.tsx",
    icon: <FileCode className="w-4 h-4" />,
    description: "Render chat thread with AI components",
  },
  state: {
    filename: "syncStateWithAI.tsx",
    icon: <MonitorIcon className="w-4 h-4" />,
    description: "Sync component state with AI",
  },
  tools: {
    filename: "useClientSideTools.tsx",
    icon: <Zap className="w-4 h-4" />,
    description: "Client-side tools for AI interaction",
  },
  mcp: {
    filename: "useMCPClientSide.tsx",
    icon: <FileJson className="w-4 h-4" />,
    description: "MCP server integration",
  },
};

// Code examples for different tabs
const codeExamples: Record<TabKey, string> = {
  register: `import { TamboProvider } from "@tambo-ai/react";
import { z } from "zod";
import { Graph } from "./Graph";

const components = [
  {
    name: "Graph",
    description: "Charts (bar, line, pie) with Recharts.",
    component: Graph,
    propsSchema: z.object({ /* props here */ }),
  },
];

export default function App() {
  return (
    <TamboProvider apiKey={env.API_KEY} components={components}>
      <YourApp />
    </TamboProvider>
  );
}`,

  input: `const { value, setValue, submit } = useTamboThreadInput();

<form onSubmit={e => { e.preventDefault(); submit(); }}>
  <input value={value} onChange={e => setValue(e.target.value)} />
  <button>Send</button>
</form>`,

  render: `import { useTambo } from "@tambo-ai/react";

export function ChatThread() {
  const { thread } = useTambo();

  return (
    <div className="thread">
      {thread.messages.map((m, i) => (
        <div key={i} className={\`message \${m.role}\`}>
          {m.content && <p>{m.content}</p>}
          {m.component && <div className="ai-ui">{m.component.renderedComponent}</div>}
        </div>
      ))}
    </div>
  );
}`,

  state: `import { useTamboComponentState } from "@tambo-ai/react";

export function WeatherCard() {
  const [weather, , { isPending }] = useTamboComponentState("weather", {
    temperature: 0,
    condition: "",
    location: "",
  });

  return isPending ? (
    <div>Loading…</div>
  ) : (
    <div>
      <h3>{weather.location}</h3>
      <div>{weather.temperature}°C</div>
      <div>{weather.condition}</div>
    </div>
  );
}`,

  tools: `import { z } from "zod";

const tools = [
  {
    name: "getWeather",
    description: "Return weather for a city",
    tool: async (city: string) => fetchWX(city),
    toolSchema: z
      .function()
      .args(z.string())
      .returns(
        z.object({
          temperature: z.number(),
          condition: z.string(),
          location: z.string(),
        }),
      ),
  },
];

<TamboProvider apiKey={env.API_KEY} tools={tools}>
  <YourApp />
</TamboProvider>;`,

  mcp: `<TamboProvider apiKey={env.API_KEY} components={components}>
  <TamboMcpProvider
    mcpServers={[
      { url: "https://mcp-1.com", name: "mcp-1", transport: "http" },
    ]}
  >
    {children}
  </TamboMcpProvider>
</TamboProvider>`,
};

// HighlightedCodeBlock component for code rendering with highlight.js
interface HighlightedCodeBlockProps {
  code: string;
}

export const HighlightedCodeBlock: React.FC<HighlightedCodeBlockProps> = ({
  code,
}) => {
  const highlighted = hljs.highlight(code, { language: "typescript" }).value;
  const lines = highlighted.split(/\n/);
  return (
    <>
      {lines.map((line: string, idx: number) => {
        const lineNumber = idx + 1;
        return (
          <div
            key={lineNumber}
            style={{
              display: "block",
              paddingLeft: 4,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                color: "#b0b0b0",
                userSelect: "none",
                textAlign: "right",
                marginRight: 8,
                fontSize: "0.85em",
              }}
            >
              {lineNumber}
            </span>
            <span dangerouslySetInnerHTML={{ __html: line || "\u200B" }} />
          </div>
        );
      })}
    </>
  );
};

export function CodeSnippets() {
  const [activeTab, setActiveTab] = useState<TabKey>("register");

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
  };

  return (
    <Section
      id="code-snippets"
      className="py-4 sm:py-6 md:py-8 lg:py-10 scroll-mt-16"
    >
      <div className="w-full space-y-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Code Examples
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore different ways to use Tambo in your applications
          </p>
        </div>

        <div className="w-full max-w-[90vw] md:max-w-[80vw] h-[70vh] md:h-[65vh] mx-auto">
          <div className="rounded-lg overflow-hidden border shadow-md bg-background h-full flex">
            {/* Left sidebar with tabs (VS Code style) */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
              {/* Explorer header */}
              <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 font-medium text-sm text-gray-700">
                EXPLORER
              </div>

              {/* File tabs */}
              <div className="flex-1 overflow-y-auto">
                {Object.entries(fileInfo).map(
                  ([key, { filename, icon, description }]) => (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key as TabKey)}
                      className={clsx(
                        "w-full px-4 py-2 text-left text-sm transition-colors flex items-center space-x-2 hover:bg-gray-100",
                        activeTab === key
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                          : "text-gray-700",
                      )}
                      title={description}
                    >
                      {icon}
                      <span className="truncate">{filename}</span>
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Tab header */}
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
                <div className="flex items-center space-x-2">
                  {fileInfo[activeTab].icon}
                  <span className="text-sm font-medium">
                    {fileInfo[activeTab].filename}
                  </span>
                </div>
              </div>

              {/* Code content */}
              <div className="flex-1 overflow-auto">
                <pre
                  className="hljs language-typescript"
                  style={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: "0.9rem",
                    boxShadow: "none",
                    height: "100%",
                    overflow: "auto",
                    padding: "1rem",
                  }}
                >
                  <code>
                    <HighlightedCodeBlock code={codeExamples[activeTab]} />
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
