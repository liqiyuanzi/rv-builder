var config = require('./preset');

module.exports = {
  "presets": config().presets,
  "plugins": config().plugins,
  "ignore": ["node_modules"],
  "exclude": ["node_modules"],
  "include": ['dist_test/test/type/**/*.js', 'dist_demo/**/*.js', '**/**/*.tsx', '**/**/*.jsx']
};