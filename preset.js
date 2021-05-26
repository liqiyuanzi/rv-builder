module.exports = function() {
    const { RF_BUILDER_ENV, RF_BUILDER_ALIAS } = process.env;
    const useESModules = RF_BUILDER_ENV !== 'cjs';

    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs : false,
                useESModules,
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
                    modules : useESModules ? false : 'cjs',
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