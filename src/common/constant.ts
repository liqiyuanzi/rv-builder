import { getConfig, join, dirname, getFullPath, getEev } from './index';
export const BASE_FILE = 'rv.config';
export const RENDER_FN = '__vue_render__';
export const STATIC_RENDER_FN = '__vue_staticRenderFns__';
const CWD = process.cwd();

const getBaseConfig = ( dir = CWD ): string => {
    return getFullPath( join( dir, BASE_FILE ) );
};

/* eslint-disable */
const getRVConfig = (): any => {
    try {
        return require( getBaseConfig() );
    } catch( err ) {
        return '';
    }
};
/* eslint-enable */

export const getSourceDir = <T = string>( path: string ): T => {
    return getConfig( getRVConfig(), path ); //eslint-disable-line
};

const getRootDir = ( dir: string ): string => {
    if( getBaseConfig( dir ) ) {
        return dir;
    }

    const parentDir = dirname( dir );
    if( dir === parentDir ) {
        return dir;
    }

    return getRootDir( parentDir );
};

export const ROOT_DIR = getRootDir( CWD );
export const SRC_DIR = getSourceDir( 'src' );
export const DIST_DIR = getSourceDir( 'dist' );

export const translate = ( str: string ): string => {
    if( !str ) return '';
    const dirName = getSourceDir( getEev() ? getEev() + '.dist' : DIST_DIR );
    return str.replace( /\[dist\]/g, dirName );
};

export const getSrcDir = ( type = getEev() ): string => {
    return join( CWD, translate( getSourceDir( type + '.src' ) ) || SRC_DIR );
};

export const getDistDir = ( type = getEev() ): string => {
    return join( CWD, translate( getSourceDir( type + '.dist' ) ) || DIST_DIR );
};

