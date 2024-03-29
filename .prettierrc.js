module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  plugins: ['prettier-plugin-packagejson'],
  overrides: [
    {
      files: '*.ts',
      options: { parser: 'typescript' }
    }
  ]
};
