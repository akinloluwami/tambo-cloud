import type { JestConfigWithTsJest } from "ts-jest";
import { createRequire } from "module";

// Provide CommonJS `require` in ESM context for tools like `prettierPath`.
 
const require = createRequire(import.meta.url);

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^@tambo-ai-cloud/(.*)$": "<rootDir>/../../packages/$1/src",
  },
  prettierPath: require.resolve("prettier"),
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/esm/"],
};

export default config;
