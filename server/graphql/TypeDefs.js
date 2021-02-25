import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        account(email: String): [Account]
    }

    type Mutation {
        createAccount(data: CreateAccountInput!): AccountOutput!
        deleteAccount(id: ID!): String!
        updateAccount(id: ID!, data: UpdateAccountInput): String!
        login(data: LoginInput): AccountOutput!
        logout(id: ID!): String!
        checkToken(token: String!): String!
    }

    input CreateAccountInput {
        name: String!
        email: String!
        password: String!
    }

    type AccountOutput {
        accessToken: String
        refreshToken: String
    }

    input UpdateAccountInput {
        name: String
        email: String
        password: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Account {
        id: ID!
        name: String!
        email: String!
        password: String!
        img: String
        lastActive: String!
        createDate: String!
    }
`;