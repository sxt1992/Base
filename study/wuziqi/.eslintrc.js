// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'linebreak-style': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'no-continue': 0,
    'one-var': 0,
    'no-sequences': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
