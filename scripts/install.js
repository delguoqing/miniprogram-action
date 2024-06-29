const { execSync } = require('child_process');

function exec(command) {
  execSync(command, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

exec('npm install babel-core babel-loader --save-dev')
exec('npm install pnpm@8 -g');
exec('pnpm install --no-frozen-lockfile');
exec('pnpm install --frozen-lockfile');
