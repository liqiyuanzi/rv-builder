
import React from 'react';
import clsx from 'clsx';
import './index.less';

type Props = {
    children?: JSX.Element;
    [ key: string ]: any
}

type TipType = Props & {
    text?: string;
    type?: string
}

export default function Count( props: TipType ): React.ReactElement {
    const { className, text, type = 's' } = props

    return  <div className={ clsx( 'tip-text-base', 'tip-text-' + type , className )}>
                <span className='detail'>{ text }</span>
            </div>
}