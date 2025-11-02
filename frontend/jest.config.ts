import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	//testEnvironment: 'node',
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    transform: {}
};

export default config;
