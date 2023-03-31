module.exports = {
  testMatch: [ "**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],


}