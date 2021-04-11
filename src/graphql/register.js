import { gql } from 'apollo-boost';

export const REGISTER = gql`
    mutation Register($input: CreateAccountInput!){
        createAccount(data: $input)
    }
`