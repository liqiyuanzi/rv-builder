import { isObject } from '../common';
import { getSourceDir, translate } from '../common/constant';

type Alias = {
    [ key in string ]: string
};

const setAlias = ( config: string ): void => {
    process.env.RF_BUILDER_ALIAS = config;
};

export default function alias(): void {
    const config = getSourceDir<Alias>( 'alias' );
    if( !isObject( config ) ) { setAlias( '' ); return }

    setAlias( translate( JSON.stringify( config ) ) );
}