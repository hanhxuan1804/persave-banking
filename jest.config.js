const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/e2e'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^\\$paraglide/(.*)$': '<rootDir>/src/paraglide/$1',
  },
};

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ['/node_modules/(?!(inlang|@inlang|rsc-env)/)'],
});
