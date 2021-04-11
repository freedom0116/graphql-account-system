import { gql } from 'apollo-boost';

export const LOGOUT = gql`
    mutation Logout{
        logout
    }
`;