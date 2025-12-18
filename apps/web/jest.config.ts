import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  testEnvironmentOptions: {
    timezone: 'UTC',
  },
}

export default config
