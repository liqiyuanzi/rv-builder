const EXPORT = 'export default {';

import { copy, readdirSync, removeSync, remove, copySync, copyFile, lstatSync, readFileSync, writeFileSync, existsSync } from 'fs-extra';
import { sep, join, parse, relative, dirname } from 'path';
import hash from 'hash-sum';

type Obj = { [ key in string ]: any };// eslint-disable-line

export const DEMO_REGEXP = new RegExp( '\\' + sep + 'demo$' );
export const TEST_REGEXP = new RegExp( '\\' + sep + 'test$' );
export const VUE_REGEXP = new RegExp( /\.vue$/ );
export const JS_REGEXP = new RegExp( /\.(jsx|tsx|ts|js)$/ );
export const STYLE_REGEXP = new RegExp( /\.(less|scss|styl)$/ );
export const EXT_REGEXP = /\.\w+$/;
export const STYLE_IMPOPRTS = /import\s+(?:"|')[^"']+(\.\w+)(?:"|')(?:$|;|\n)/g;
export const JS_IMPOPRTS = /import\s+[^'"]+\s+from\s+(?:"|')(?:[^"']+)(\.\w+)("|')(?:$|;|\n)/g;

export function isDef( v: any ) {// eslint-disable-line
    return v !== undefined && v !== null;
}

export function isObject( v: any ): boolean {// eslint-disable-line
    return Object.prototype.toString.call( v ) === '[object Object]';
}

export function isDir( path: string ): boolean {
    return lstatSync( path ).isDirectory();
}

export function isTestDir( path: string ): boolean {
    return DEMO_REGEXP.test( path );
}

export function isDemoDir( path: string ): boolean {
    return TEST_REGEXP.test( path );
}

export function isVue( path: string ): boolean {
    return path.endsWith( '.vue' );
}

export function isJs( path: string ): boolean {
    return JS_REGEXP.test( path );
}

export function isStyle( path: string ): boolean {
    return STYLE_REGEXP.test( path );
}

export function replaceExt( path: string, ext: string ): string {
    return path.replace( EXT_REGEXP, ext );
}

export function replace( str: string, fn: { ( v: string ): string } ): string {
    return str.replace( EXPORT, (): string => {
        return fn( EXPORT );
    } );
}

export function getConfig( options: Obj, path: string ): any {// eslint-disable-line
    if( !options || !path ) return '';
    let tmp = options;

    for( const item of path.split( '.' ) ) {
        try {
            if( typeof tmp !== 'object' ) {
                return undefined;
            }
            tmp = tmp[ item ];
        } catch( e: unknown ) {
            return undefined;
        }
    }

    return tmp;
}

export function getFullPath( path: string ): string {
    const exts = [ '.js', '.json' ];

    for( let i = 0; i < exts.length; i++ ) {
        const fullPath = path + exts[ i ];
        if( existsSync( fullPath ) ) {
            return fullPath;
        }
    }

    return '';
}

export function translateStyleImports( text: string ): string {
    return text.replace( STYLE_IMPOPRTS, ( source, match ) => source.replace( match, '.css' ) );
}

export function translateJsImports( text: string ): string {
    return text.replace( JS_IMPOPRTS, ( source, str ) => source.replace( str, '.js' ) );
}

export const setEev = ( env: string ): void => {
    process.env.RF_BUILDER_ENV = env;
};

export const getEev = (): string => {
    return process.env.RF_BUILDER_ENV ?? '';
};

export const errorHandler = ( err: Error ): void => {
    console.log( err );
};

export { copy, copySync, copyFile, readdirSync, readFileSync, remove, removeSync, join, hash, writeFileSync, parse, relative, existsSync, dirname };