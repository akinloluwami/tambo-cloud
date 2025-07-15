"use client";

import { Section } from "@/components/section";
import { clsx } from "clsx";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/stackoverflow-light.css";
import {
  ChevronDown,
  Code,
  MonitorIcon,
  PackageIcon,
  Search,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

hljs.registerLanguage("typescript", typescript);

type TabKey = "register" | "input" | "render" | "state" | "tools" | "mcp";
// | "interactive"
// | "context";

// File information for each code example
const fileInfo: Record<
  TabKey,
  {
    filename: string;
    icon: React.ReactNode;
    description: string;
    preview: string;
  }
> = {
  register: {
    filename: "registerGenUI.tsx",
    icon: <PackageIcon className="w-4 h-4" />,
    description: "Register components with TamboProvider",
    preview: "register your own react components",
  },
  input: {
    filename: "sendMessage.tsx",
    icon: <Code className="w-4 h-4" />,
    description: "Handle user input and message sending",
    preview: "send messages to the ai with our hooks",
  },
  render: {
    filename: "renderGenUI.tsx",
    icon: <Wand2 className="w-4 h-4" />,
    description: "Render chat thread with AI components",
    preview: "render ai generated components",
  },
  state: {
    filename: "syncStateWithAI.tsx",
    icon: <MonitorIcon className="w-4 h-4" />,
    description: "Sync component state with AI",
    preview: "state management for your ai agents",
  },
  tools: {
    filename: "useClientSideTools.tsx",
    icon: <Zap className="w-4 h-4" />,
    description: "Client-side tools for AI interaction",
    preview: "improve context with data fetching",
  },
  mcp: {
    filename: "useMCPClientSide.tsx",
    icon: <Search className="w-4 h-4" />,
    description: "MCP server integration",
    preview: "add mcp servers in a few lines of code",
  },
  //interactive: {
  //  filename: "addInteracableComponents.tsx",
  //  icon: <MousePointer className="w-4 h-4" />,
  //  description: "Interactive components in chat",
  //  preview: "interact with any component in your chat",
  //},
  //context: {
  //  filename: "addContext.tsx",
  //  icon: <MessageSquare className="w-4 h-4" />,
  //  description: "Add context to chat easily",
  //  preview: "add context in the chat easily",
  // },
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

  input: `// Option 1: Using form input with hooks
const { value, setValue, submit } = useTamboThreadInput();

<form onSubmit={e => { e.preventDefault(); submit(); }}>
  <input value={value} onChange={e => setValue(e.target.value)} />
  <button>Send</button>
</form>

// Option 2: Send messages programmatically
const { sendThreadMessage } = useTamboThread();
 
await sendThreadMessage("What is the weather like today?");`,

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

export function NameInput() {
  const [state, setState] = useTamboComponentState("name", { name: "" });

  return (
    <input
      value={state.name}
      onChange={e => setState({ name: e.target.value })}
      placeholder="Enter your name"
    />
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

  //interactive: `// Coming soon!`,

  //context: `// Cooming soon!`,
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <Section
      id="code-snippets"
      className="py-4 sm:py-6 md:py-8 lg:py-10 scroll-mt-16"
    >
      <div className="w-full space-y-4">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-4 sm:mb-8 tracking-tight">
            AI Orchestration for your UI
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            Thoughtful hooks and components to orchestrate your ai agents.
          </p>
        </div>

        <div className="w-full max-w-[90vw] md:max-w-[80vw] h-[75vh] md:h-[70vh] max-h-[600px] mx-auto">
          <div className="rounded-lg overflow-hidden border shadow-md bg-background h-full flex flex-col md:flex-row">
            {/* Mobile dropdown */}
            <div className="md:hidden" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {fileInfo[activeTab].icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {fileInfo[activeTab].filename}
                      </div>
                      <div className="text-xs text-gray-500">
                        {fileInfo[activeTab].preview}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 transition-transform",
                      isDropdownOpen ? "rotate-180" : "",
                    )}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-l border-r border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                    {Object.entries(fileInfo).map(
                      ([key, { filename, icon, preview }]) => (
                        <button
                          key={key}
                          onClick={() => handleTabChange(key as TabKey)}
                          className={clsx(
                            "w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors",
                            activeTab === key
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700",
                          )}
                        >
                          <div className="flex-shrink-0">{icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {filename}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {preview}
                            </div>
                          </div>
                        </button>
                      ),
                    )}

                    {/* Mobile docs button */}
                    <div className="border-t border-gray-200 p-3">
                      <Link
                        href="/docs"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                      >
                        Read more in our docs
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex w-72 bg-gray-50 border-r border-gray-200 flex-col">
              {/* Explorer header */}
              <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 font-medium text-sm text-gray-700">
                EXPLORER
              </div>

              {/* File tabs */}
              <div className="flex-1">
                {Object.entries(fileInfo).map(
                  ([key, { filename, icon, description, preview }]) => (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key as TabKey)}
                      className={clsx(
                        "w-full px-4 py-3 text-left text-sm transition-colors flex items-start space-x-3 hover:bg-gray-100",
                        activeTab === key
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                          : "text-gray-700",
                      )}
                      title={description}
                    >
                      <div className="flex-shrink-0 mt-0.5">{icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{filename}</div>
                        <div className="text-xs text-gray-500 mt-0.5 truncate">
                          {preview}
                        </div>
                      </div>
                    </button>
                  ),
                )}
              </div>

              {/* Desktop docs button */}
              <div className="border-t border-gray-200 p-4">
                <Link
                  href="/docs"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  Read more in our docs
                </Link>
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
