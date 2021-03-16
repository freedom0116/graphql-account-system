import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        account(email: String): [Account]
        hello: String!
    }

    type Mutation {
        createAccount(data: CreateAccountInput!): AccountOutput!
        deleteAccount: String!
        updateAccount(data: UpdateAccountInput): Account!
        login(data: LoginInput): AccountOutput!
        logout: String!
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

    type verifyOutput {
        accessToken: String!
        data: Account!
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