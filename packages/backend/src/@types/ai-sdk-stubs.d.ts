// Minimal stub declarations for missing ai-sdk modules used by ai-sdk-client.
// These modules are not currently published in the repo's node_modules, but the
// runtime code dynamically imports them only in production builds where the
// packages are installed. To keep the TypeScript compile pass during CI, we
// provide empty type-only modules here.

/* eslint-disable */

declare module "@ai-sdk/anthropic" {
  export function createAnthropic(
    config?: Record<string, any>,
  ): (modelId: string) => any;
}

declare module "@ai-sdk/google" {
  export function createGoogleGenerativeAI(
    config?: Record<string, any>,
  ): (modelId: string) => any;
}

declare module "@ai-sdk/groq" {
  export function createGroq(
    config?: Record<string, any>,
  ): (modelId: string) => any;
}

declare module "@ai-sdk/mistral" {
  export function createMistral(
    config?: Record<string, any>,
  ): (modelId: string) => any;
}

declare module "@ai-sdk/openai" {
  export function createOpenAI(
    config?: Record<string, any>,
  ): (modelId: string) => any;
}

declare module "ai" {
  // Re-export the handful of types/functions our code relies on with minimal typings.
  export type ToolSet = Record<string, any>;
  export interface ToolCallPart {
    readonly type: "tool-call";
    toolName: string;
    args: any;
    toolCallId: string;
  }
  export interface ToolResultPart {
    readonly type: "tool-result";
    toolName: string;
    result: any;
    toolCallId: string;
  }
  export type ToolContent = ReadonlyArray<ToolCallPart | ToolResultPart>;
  export interface CoreMessage {
    role: string;
    content: any;
  }
  export interface CoreToolMessage extends CoreMessage {}
  export interface CoreAssistantMessage extends CoreMessage {}

  export interface LanguageModel {
    id: string;
  }

  export type GenerateTextResult<TTools, TMeta> = {
    text: string;
    toolCalls: Array<{
      toolName: string;
      args: any;
      toolCallId: string;
    }>;
  };

  export function tool(config: any): any;
  export function jsonSchema(schema: any): any;

  export function streamText<T extends ToolSet, M>(
    params: any,
  ): {
    fullStream: AsyncIterableIterator<any>;
  };

  export function generateText<T extends ToolSet, M>(
    params: any,
  ): Promise<GenerateTextResult<T, M>>;

  export function convertToCoreMessages(messages: any[]): CoreMessage[];
}
