import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        account(email: String): [Account]
    }

    type Mutation {
        createAccount(data: CreateAccountInput!): AccountOutput!
        deleteAccount: String!
        updateAccount(data: UpdateAccountInput): String!
        login(data: LoginInput): AccountOutput!
        logout: String!
<<<<<<< HEAD
        checkToken(token: String!): String!
=======
        verifyAccount: verifyOutput
>>>>>>> f0f129b0de242cc8b859a3b49e409d85d939dbb3
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