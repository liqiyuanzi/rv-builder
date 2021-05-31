import compileVue from './vue';
import compileJS from './js';
import compileStyle from './style';
import {
    readdirSync,
    join,
    isDir,
    isTestDir,
    isDemoDir,
    isVue,
    isJs,
    isStyle,
    remove
} from '../common';

export async function compileFile( filepath: string ): Promise<void> {
    if( isVue( filepath ) ) return compileVue( filepath );
    if( isJs( filepath ) ) return compileJS( filepath );
    if( isStyle( filepath ) ) return compileStyle( filepath );
}

export async function compileDir( dir: string ): Promise<void> {
    const files = readdirSync( dir );

    await Promise.all( files.map( async ( path: string ) => {
        const filepath = join( dir, path );

        if( isDemoDir( filepath ) || isTestDir( filepath ) ) return remove( filepath );
        if( isDir( filepath ) ) return compileDir( filepath );

        return compileFile( filepath );
    } ) );
}