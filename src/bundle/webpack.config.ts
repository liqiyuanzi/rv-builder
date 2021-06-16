type Options = {
    entry: string;
    minify: boolean;
    dist: string;
    name: string;
};
import { Configuration } from 'webpack';

const config = ( options: Options ): Configuration => {
    const {
        entry,
        minify = false,
        dist : path,
        name = 'main'
    } = options;
    return {
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
    };
};

export default config;