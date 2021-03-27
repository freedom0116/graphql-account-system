import { gql } from 'apollo-boost';

export const HOME_STATUS = gql`
    query{
        homePageStatus
    }
`;