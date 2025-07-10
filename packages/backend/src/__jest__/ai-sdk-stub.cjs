// Simple runtime stub for the @ai-sdk/* packages and the generic `ai` package.
// Provides minimal no-op implementations so Jest can load modules that depend
// on them without installing the real dependencies.

function noopFactory() {
  return () => ({ /* fake LanguageModel instance */ });
}

module.exports = {
  // Provider factories
  createAnthropic: noopFactory,
  createGoogleGenerativeAI: noopFactory,
  createGroq: noopFactory,
  createMistral: noopFactory,
  createOpenAI: noopFactory,

  // Core helpers (very rough stubs)
  tool: () => ({}),
  jsonSchema: () => ({}),
  convertToCoreMessages: (messages) => messages,
  streamText: () => ({
    fullStream: {
      async *[Symbol.asyncIterator]() {
        // empty stream
      },
    },
  }),
  generateText: async () => ({ text: "stub", toolCalls: [] }),
};
