import { getConfig, join, dirname, getFullPath } from './index';
export const BASE_FILE = 'rv.config';
export const RENDER_FN = '__vue_render__';
export const STATIC_RENDER_FN = '__vue_staticRenderFns__';
const CWD = process.cwd();

/* eslint-disable */
const getRVConfig = (): any => {
    try {
        return require( getBaseConfig() );
    } catch( err ) {
        return '';
    }
};
/* eslint-enable */

const getBaseConfig = ( dir = CWD ): string => {
    return getFullPath( join( dir, BASE_FILE ) );
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

export const getSourceDir = <T = string>( path: string ): T => {
    return getConfig( getRVConfig(), path ); //eslint-disable-line
};

export const ROOT_DIR = getRootDir( CWD );
export const SRC_DIR = getSourceDir( 'src' );
export const DIST_DIR = getSourceDir( 'dist' );
export const ESM_SRC_DIR = getSourceDir( 'esm.src' ) || SRC_DIR;
export const ESM_DIST_DIR = getSourceDir( 'esm.dist' ) || DIST_DIR;
export const CJS_SRC_DIR = getSourceDir( 'cjs.src' ) || SRC_DIR;
export const CJS_DIST_DIR = getSourceDir( 'cjs.dist' ) || DIST_DIR;
export const UMD_SRC_DIR = getSourceDir( 'umd.src' ) || SRC_DIR;
export const UMD_DIST_DIR = getSourceDir( 'umd.dist' ) || DIST_DIR;
export const AMD_SRC_DIR = getSourceDir( 'amd.src' ) || SRC_DIR;
export const AMD_DIST_DIR = getSourceDir( 'amd.dist' ) || DIST_DIR;
