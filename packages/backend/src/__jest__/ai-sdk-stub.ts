// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable */

function noopFactory() {
  return () => ({
    /* fake LanguageModel instance */
  });
}

export const createAnthropic = noopFactory;
export const createGoogleGenerativeAI = noopFactory;
export const createGroq = noopFactory;
export const createMistral = noopFactory;
export const createOpenAI = noopFactory;

export const tool = () => ({});
export const jsonSchema = () => ({});
export const convertToCoreMessages = (messages: any) => messages;
export const streamText = () => ({
  fullStream: {
    async *[Symbol.asyncIterator]() {
      // empty async iterator
    },
  },
});
export const generateText = async () => ({ text: "stub", toolCalls: [] });
