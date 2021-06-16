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

export default async function bundle(): Promise<void> {
    const entry = translate( getConfig<string>( 'entry' ) );
    if( !entry ) return Promise.resolve();
    return new Promise( ( resolve ) => {
        webpack( config( {
            entry,
            dist : getDist(),
            minify : getConfig( 'minify' ),
            name : getConfig( 'name' )
        } ) ).run( () => {
            resolve();
        } );
    } );
}