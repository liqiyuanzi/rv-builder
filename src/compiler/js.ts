import { transform } from '@babel/core';
import { readFileSync, writeFileSync, replaceExt, removeSync, translateStyleImports, translateJsImports } from '../common';

export default async function( filepath: string ): Promise<void> {
    const code = readFileSync( filepath, 'utf8' );

    let result = transform( code, {
        filename : filepath
    } )?.code;
    if( !result ) return;
    result = translateStyleImports( result );
    result = translateJsImports( result );

    removeSync( filepath );
    writeFileSync( replaceExt( filepath, '.js' ), result );
    return Promise.resolve();
}