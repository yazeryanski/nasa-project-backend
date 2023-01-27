module.exports = {
  testMatch: [ "**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ['node_modules', 'src'],

}