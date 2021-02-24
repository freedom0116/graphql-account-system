import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Query {
        account(email: String): [Account]
    }

    type Mutation {
        createAccount(data: CreateAccountInput!): Account!
        deleteAccount(_id: ID!): String!
        updateAccount(_id: ID!, data: UpdateAccountInput): String!
    }

    input CreateAccountInput {
        name: String!
        email: String!
        password: String!
    }

    input UpdateAccountInput {
        name: String
        email: String
        password: String
    }

    type Account {
        _id: ID!
        name: String!
        email: String!
        password: String!
        img: String
        lastActive: String!
        createDate: String!
    }
`;