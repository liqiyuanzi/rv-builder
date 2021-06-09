import { isObject } from '../common';
import { getSourceDir, DIST_DIR } from '../common/constant';
import { getEev } from '../command';

type Alias = {
    [ key in string ]: string
};

const setAlias = ( config: string ): void => {
    process.env.RF_BUILDER_ALIAS = config;
};

const translate = ( str: string ): string => {
    const dirName = getSourceDir( getEev() ? getEev() + '.dist' : DIST_DIR );
    return str.replace( /\{dist_dir\}/g, dirName );
};

export default function alias(): void {
    const config = getSourceDir<Alias>( 'alias' );
    if( !isObject( config ) ) { setAlias( '' ); return }

    setAlias( translate( JSON.stringify( config ) ) );
}