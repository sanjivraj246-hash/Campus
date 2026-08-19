const http = require('http');

const routes = [
  '/',
  '/dashboard',
  '/resume-analyzer',
  '/skill-gap',
  '/learning-path',
  '/career-mentor',
  '/interview',
  '/academics',
  '/attendance',
  '/projects',
  '/hackathons',
  '/coding',
  '/placements',
  '/faculty',
  '/admin',
  '/login',
  '/register',
  '/onboarding',
  '/settings'
];

async function testAll() {
  console.log('Testing all CampusAI frontend routes...');
  let passed = 0;
  for (const r of routes) {
    await new Promise((resolve) => {
      http.get('http://localhost:3000' + r, (res) => {
        if (res.statusCode === 200) {
          console.log(`[PASS] ${r} -> Status: 200 OK`);
          passed++;
        } else {
          console.error(`[FAIL] ${r} -> Status: ${res.statusCode}`);
        }
        resolve();
      }).on('error', (err) => {
        console.error(`[ERROR] ${r} -> ${err.message}`);
        resolve();
      });
    });
  }
  console.log(`\nResults: ${passed} / ${routes.length} routes passed successfully with 200 OK!`);
}

testAll();
