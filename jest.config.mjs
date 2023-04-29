import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./src",
});

const config = {
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
