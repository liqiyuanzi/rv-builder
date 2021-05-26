const CWD = process.cwd();

import { getConfig, join, dirname, getFullPath } from './index';
export const BASE_FILE = 'rv.config';
export const RENDER_FN = '__vue_render__';
export const STATIC_RENDER_FN = '__vue_staticRenderFns__';

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
    return getConfig( getRVConfig(), path ) || join( ROOT_DIR, path );// eslint-disable-line
};

export const ROOT_DIR = getRootDir( CWD );
export const SRC_DIR = getSourceDir( 'src' );
export const DIST_DIR = getSourceDir( 'dist' );
