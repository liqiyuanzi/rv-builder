
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
type Options = {
    entry: string;
    minify: boolean;
    dist: string;
    name: string;
    webpack: Configuration;
};

const config = ( options: Options ): Configuration => {
    const {
        entry,
        minify = false,
        dist : path,
        name = 'main',
        webpack = {}
    } = options;
    return merge( {
        stats : 'detailed',
        mode : 'production',
        entry : {
            [ name ] : entry
        },
        output : {
            filename : minify ? '[name].min.js' : '[name].js',
            path,
            umdNamedDefine : true,
            globalObject : 'typeof self !== "undefined" ? self : this',
            libraryTarget : 'umd'
        },
        resolve : {
            extensions : [ '.js', '.mjs' ],
            symlinks : false
        },
        optimization : {
            minimize : minify
        },
        module : {
            rules : [
                {
                    test : /\.m?js/,
                    resolve : {
                        fullySpecified : false
                    }
                },
                {
                    test : /\.css$/,
                    use : [
                        require.resolve( 'style-loader' ), {
                            loader : require.resolve( 'css-loader' ),
                            options : {
                                importLoaders : 1
                            }
                        }
                    ]
                },
                {
                    test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use : 'url-loader?limit=10000'
                },
                {
                    test : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use : 'url-loader?limit=10000'
                }
            ]
        }
    }, webpack );
};

export default config;