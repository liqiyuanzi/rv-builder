module.exports = {
  plugins: ['@ynn'],
  extends: ['plugin:@ynn/recommended'],
  root: true,
  ignorePatterns: ['.yarn'],
  rules: {
    'class-methods-use-this': 'off'
  }
};