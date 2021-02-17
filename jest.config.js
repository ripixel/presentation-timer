module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.ts'],
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    // Ignore coverage for certain files, such as node_modules, types, and development helpers
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/index.tsx',
    '!src/types/**',
    '!types.ts',
    '!src/provider/Village/Dev/index.ts',
  ],
  coverageThreshold: {
    'src/**/*.{js,jsx,ts,tsx}': {
      // Set these all to 30 - we just want to ensure that a file actually gets covered, we're not too worried
      // about actual coverage %ages _yet_
      statements: 30,
      branches: 30,
      functions: 30,
      lines: 30,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
