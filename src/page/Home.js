import React from "react";
import { useQuery } from 'react-apollo';
import { HOME_STATUS } from '../graphql'

export function Home () {
    const { error, data } = useQuery(HOME_STATUS);

    

    return (
        <div>
            {error ?
                <div>Token expire or need login</div> :
                <div>Authorization passed</div>
            }
        </div>
    );
}