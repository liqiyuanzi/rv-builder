import { render } from 'less';
import { readFileSync } from '../common';

export default async function( filepath: string ): Promise<string> {
    const source = readFileSync( filepath, 'utf-8' );
    const { css } = await render( source, {
        filename : filepath
    } );

    return css;
}