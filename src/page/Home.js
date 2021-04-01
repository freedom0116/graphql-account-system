import { useQuery } from 'react-apollo';
import React, { useState } from 'react';
import { HOME_STATUS } from '../graphql'

export function Home () {
    const { error: queryError, refetch } = useQuery(HOME_STATUS);
    const [error, setError] = useState(false);

    const handleCheck = async () => {
        console.log(localStorage.getItem('accessToken'))
        try {
            await refetch();
            setError(false);
        } catch {
            setError(true);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center"}}>
            <div>Home Page</div>
            <button
                onClick={() => handleCheck()}
            >
                check status
            </button>
            {(queryError || error) ?
                <div>Token expire or need login</div> :
                <div>Authorization passed</div>
            }
        </div>
    );
}