module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  rootDir: './',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/**/?(*.)+(unit|int|e2e|spec|test).(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  collectCoverage: true,
  moduleNameMapper: {
    '^@application(.*)$': '<rootDir>/src/application$1',
    '^@presentation(.*)$': '<rootDir>/src/presentation$1',
    '^@infrastructure(.*)$': '<rootDir>/src/infrastructure$1',
    '^@domain(.*)$': '<rootDir>/src/domain$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts', 'jest-extended/all'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/', '<rootDir>/dist/'],

  // /* Basic settings */
  // // Enable verbosity
  // verbose: true,
  // // The root directory that Jest should scan for tests and modules within
  // rootDir: './',
  // // A list of paths to directories that Jest should use to search for files in
  // roots: ['<rootDir>'],
  // testEnvironment: 'node',
  // testEnvironmentOptions: {
  //   NODE_ENV: 'test',
  // },
  // testMatch: ['<rootDir>/test/**/?(*.)+(unit|int|e2e|spec|test).(ts|js)'],
  // // preset: 'ts-jest',
  // transform: {
  //   '^.+.tsx?$': [
  //     'ts-jest',
  //     {
  //       tsconfig: '<rootDir>/tsconfig.json',
  //     },
  //   ],
  // },
  // // Resolve 'paths' from tsconfig.json
  // moduleNameMapper: {
  //   '^@application(.*)$': '<rootDir>/src/application$1',
  //   '^@presentation(.*)$': '<rootDir>/src/presentation$1',
  //   '^@infrastructure(.*)$': '<rootDir>/src/infrastructure$1',
  //   '^@domain(.*)$': '<rootDir>/src/domain$1',
  // },
  // // Ignore paths and modules
  // // modulePathIgnorePatterns: ['<rootDir>/dist'],

  // /* Bootstrap settings */
  // // Set initial config and enable jest-extended features
  // setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts', 'jest-extended/all'],

  // /* Global test settings */
  // // Automatically clear mock calls and instances between every test
  // clearMocks: true,

  // /* Coverage settings */
  // collectCoverage: false,
  // // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',
  // // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  // coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  // // Jest custom reporters
  // reporters: ['default'],
  // /*
  //  * Uncomment if you want to set thresholds for code coverage
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100
  //   }
  // }
  // */
}
