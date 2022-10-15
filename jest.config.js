module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverageFrom: ['!<rootDir>/src/domain/**', '<rootDir>/src/**/*.js', '!**/test/**'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
