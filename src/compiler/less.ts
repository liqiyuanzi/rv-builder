import { render } from 'less';
import { readFileSync } from '../common';

export default async function( filepath: string ): Promise<string> {
    const source = readFileSync( filepath, 'utf-8' );
    try {
        const { css } = await render( source, {
            filename : filepath,
            syncImport : true
        } );
        return css;
    } catch( e: unknown ) {
        console.log( 'err:', e );
        return '';
    }
}