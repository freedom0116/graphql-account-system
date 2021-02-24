import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Query {
        hello(name: String): String 
    }

    type Mutation {
        createAccount(data: CreateUserInput!): User!
    }

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        img: String
        last_active: String!
        create_date: String!
    }
`;