import { getSourceDir, ROOT_DIR, translate } from '../common/constant';
import { getEev, join } from '../common/index';
import webpack from 'webpack';
import config from './webpack.config';

function getConfig<T>( path: string ): T {
    return getSourceDir( getEev() + '.' + path ) as T;
};

function getDist(): string {
    return join( ROOT_DIR, getConfig( 'dist' ) );
}

function getOutputName( minify: boolean, name: string ): string {
    const suffix = minify ? '.min' : '';
    return name + suffix + '.js';
}

export default async function bundle(): Promise<string | void> {
    const entry = translate( getConfig<string>( 'entry' ) );
    if( !entry ) return Promise.resolve();
    const dist = getDist();
    const minify = getConfig( 'minify' ) as boolean;
    const name = getConfig( 'name' ) as string;
    const outputName = getOutputName( minify, name );
    return new Promise( ( resolve ) => {
        webpack( config( {
            entry,
            dist,
            minify,
            name,
            webpack : getSourceDir( 'webpack' )
        } ), ( error, stats ) => {
            if( error ) {
                console.log( 'webpack_error:', error );
            }
            console.log( stats?.toString( {
                colors : true
            } ) );

            resolve( outputName );
        } ).run( () => {
            // resolve( outputName );
        } );
    } );
}