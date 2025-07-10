// Local stub declarations for AI SDK packages – ensures `tsc` for apps/api can
// resolve backend imports without the real libraries installed.

/* eslint-disable */

declare module "@ai-sdk/anthropic" {
  export const createAnthropic: (...args: any[]) => any;
}

declare module "@ai-sdk/google" {
  export const createGoogleGenerativeAI: (...args: any[]) => any;
}

declare module "@ai-sdk/groq" {
  export const createGroq: (...args: any[]) => any;
}

declare module "@ai-sdk/mistral" {
  export const createMistral: (...args: any[]) => any;
}

declare module "@ai-sdk/openai" {
  export const createOpenAI: (...args: any[]) => any;
}

declare module "ai" {
  export const tool: (...args: any[]) => any;
  export const jsonSchema: (...args: any[]) => any;
  export const convertToCoreMessages: (...args: any[]) => any;
  export const streamText: (...args: any[]) => any;
  export const generateText: (...args: any[]) => any;
  export interface CoreMessage {
    role: string;
    content: any;
  }
  export interface CoreToolMessage extends CoreMessage {}
  export interface CoreAssistantMessage extends CoreMessage {}
  export interface ToolCallPart {
    type: "tool-call";
    toolName: string;
    args: any;
    toolCallId: string;
  }
  export interface ToolResultPart {
    type: "tool-result";
    toolName: string;
    result: any;
    toolCallId: string;
  }
  export type LanguageModel = any;
  export type ToolContent = Array<ToolCallPart | ToolResultPart>;
  export type GenerateTextResult<TTools, TMeta> = any;
  export type ToolSet = Record<string, any>;
}
