module.exports = {
  clearMocks: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**/*.{ts,tsx}"],
  coverageReporters: ["html", "text"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.ts",
  },
};
