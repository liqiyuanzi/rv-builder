var config = require( './preset' );

module.exports = {
    'presets' : config().presets,
    'plugins' : config().plugins,
    'ignore' : [ 'node_modules' ],
    'exclude' : [ 'node_modules' ],
    'include' : [
        'dist_test/test/type/**/*.js',
        'dist_demo/**/*.js',
        'dist_amd_demo/**/*.js',
        'dist_umd_demo/**/*.js',
        'dist_umd_demo/**/*.ts',
        'dist_umd_demo/**/*.d.ts',
        'dist_umd_demo/*.js',
        'dist_cjs_demo/**/*.js',
        'dist_esm_demo/**/*.js',
        '**/**/*.tsx',
        '**/**/*.ts',
        '**/**/*.d.ts',
        '**/**/*.jsx'
    ]
};