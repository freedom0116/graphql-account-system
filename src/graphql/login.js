import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation Login($input: LoginInput){
        login(data: $input){
            accessToken
            refreshToken
        }
    }
`