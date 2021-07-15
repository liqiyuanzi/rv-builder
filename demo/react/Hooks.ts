/******************************************************************
 * Created by lqy at 08/03/2020
 ******************************************************************/
 import React from 'react';
 export type RegisterResultProps = {
     data: {
        drugs: Array<{
            name: string
        }>
     };
 };
 
 export default function Card( props: RegisterResultProps ): JSX.Element {
     const { data } = props;
     const [ a, setA ] = React.useState( '123' )
     const drugs = data.drugs.map( ( item: any ) => {
         return item.name
     } )
 
     return ( <div >
            {
                drugs.join(',')
            }
            { a }
        </div>  
     )
 }