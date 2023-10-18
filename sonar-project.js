// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'https://qube.indexnine.com',
    token: '0e081c8005cf468b1524c90aa8188c3a5fb94c91',
    options: {
      'sonar.projectName': 'Node.js - NestJS Seed',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.exclusions': '**/__tests__/**,src/environments/*,src/app/*.module.ts,src/app/**/*.module.ts,dist/**',
      'sonar.test.inclusions': 'src/**/*.spec.tsx,src/**/*.spec.ts',
    },
  },
  () => process.exit(),
);
