module.exports = function() {
    const { RF_BUILDER_ENV, RF_BUILDER_ALIAS } = process.env;
    const buildType = RF_BUILDER_ENV ;

    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs : false,
                useESModules: buildType === 'esm',
            },
        ],
        '@babel/plugin-transform-object-assign',
    ];

    if( RF_BUILDER_ALIAS ) {
        let alias = {};
        
        try { 
            alias = JSON.parse( RF_BUILDER_ALIAS )
        } catch( err ) {
            alias = {}
        }

        plugins.push( [
            'babel-plugin-module-resolver',
            {
              alias
            },
        ] )
    }

    return {
        presets : [
            [
                '@babel/preset-env',
                {
                    loose : true,
                    modules : buildType === 'esm' ? false : buildType,
                },
            ],
            [
                '@vue/babel-preset-jsx',
                {
                    functional : false,
                },
            ],
            [ 
                '@babel/preset-typescript',
                {
                    allExtensions: true,
                    isTSX: true,
                    allowNamespaces: true
                }
            ]
        ],
        plugins,
    };
};