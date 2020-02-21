import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const LOG_IN = gql`
    mutation login($email: String!, $password:  String!) {
        login(email: $email, password: $password){
            email
            firstName
            id
            lastName
            name
            token
        }
    }
`;



const Login = () => {
    let email;
    let password;
    
    const [logIn, {loading,error,data}] = useMutation(LOG_IN, {        
        update(cache, { data: {loginData}}) {
            localStorage.setItem("token", loginData.token)
        }
    });
    if (loading) return 'Loading..';
    if (error) return `Error ${error.message}`;
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                logIn({ variables: { email: email.value, password: password.value } })
            }}>
                <input ref={node => {
                    email = node;
                }}
                />

                <input ref={node => {
                    password = node;
                }}
                />

                <button type="submit"> Login </button>
            </form>
        </div>
    );
}



export default Login;
