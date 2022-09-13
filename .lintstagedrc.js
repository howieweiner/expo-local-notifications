module.exports = {
  // check for typescript compilation issues
  '**/*.ts?(x)': () => 'npx --no-install tsc -p tsconfig.json --noEmit',
  // Lint files
  '*.{js,ts,tsx,jsx,yml}': ['eslint --cache --fix'],
}
