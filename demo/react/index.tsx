
import React from 'react';
import clsx from 'clsx';
import './index.less';
import a from '@@component/c'

console.log( a );
type Props = {
    children?: JSX.Element;
    [ key: string ]: any;
};

type TipType = Props & {
    text?: string;
    type?: string;
};

class M {
    private requestPools = new Map();
}

new M();

export default function Count( props: TipType ): React.ReactElement {
    const { className, text, type = 's' } = props

    return  <div className={ clsx( 'tip-text-base', 'tip-text-' + type , className )}>
                <span className='detail'>{ text }</span>
            </div>
}