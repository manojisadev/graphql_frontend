import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOG_IN = gql `
    mutation userLogin($email: String!, $password:  String!) {
        userLogin(email: $email, password: $password){
            authenticatable {
                email
            }
            credentials {
                accessToken,
                client,
                expiry,
                tokenType,
                uid
            }
        }
    }
`;



const Login = () => {
    let email;
    let password;
    return (
        <Mutation mutation={LOG_IN}>
            {(userLogin, {data}) => (
                <div>
                    <form onSubmit = {e=> {
                        e.preventDefault();
                        userLogin({variables: {email: email.value, password: password.value}})
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
            )}
        </Mutation>
    );
};

export default Login;
