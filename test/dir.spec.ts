import { SRC_DIR, DIST_DIR } from '../src/common/constant';

describe( 'dir', () => {
    it( 'dir.src_dir', () => {
        expect( SRC_DIR ).toEqual( 'demo' );
        expect( DIST_DIR ).toEqual( 'dist_demo' );
    } );
} );
