import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const LOG_OUT = gql`
    mutation logout {
        logout
    }
`;

const Logout = () => {
    const [logOut, {loading, error, data}] = useMutation(LOG_OUT)

    if (loading) return 'Loading..';
    if (error) return `Error ${error.message}`;

    return (
        <div>
            <button type="Submit" onClick={
                e => {
                    e.preventDefault();
                    logOut();
                    console.log(data)
                }
            }> Logout </button>
        </div>
    )
}

export default Logout;
