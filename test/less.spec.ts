import { join } from 'path';
import compileLess from '../src/compiler/less';

describe( 'compiler-less', () => {
    it( 'compiler-less.less', async () => {
        const path = join( __dirname, './type/less/test.less' );
        const css = await compileLess( path );

        expect( css.includes( '.y .m' ) ).toBe( true );
        expect( css.includes( '.x .m' ) ).toBe( true );
    } );
} );
