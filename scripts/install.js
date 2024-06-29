const { execSync } = require('child_process');

function exec(command) {
  execSync(command, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

exec('npm install pnpm@8 -g');
exec('npm install babel-core babel-loader --save-dev')
exec('pnpm install --frozen-lockfile');
