# GraphQL account system

This project is an simple account system practice using GraphQL

## introduction

[GraphQL](https://graphql.org/) is an trendy structure that it is faster, more flextible than RESTful API's. User can define its own fetching data type to prevent overfetching or underfetching. In this project, we will use so GraphQL with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)(JWT) to build a simple client authentication system.

### `Postman`

[Postman](https://www.postman.com/) is a powerful tool for backend structure testing. It allows us to test our code without building the cliend side. In this project, we will us query and mutation on the Postman. The reason I choose to use Postman, instead of GraphQL playground is that we want to put the token in the header for the authorization. 

### `MongoDB`
[MongoDB](https://www.mongodb.com/) is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

## Getting Started

Type the following steps in your terminal to get started with this project.

```
git clone https://github.com/freedom0116/graphql-account-system.git

cd modern-graphql-tutorial

yarn
```

Next, you should input the MONGE_URL, ACCESS_TOEKN_KEY, and REFRESH_TOKEN_KEY in .env.defaults. For mongoDB database, I recommend [MongoDB Altas](https://www.mongodb.com/cloud/atlas) which is a free cloud database or you can build your own with docker.

Finally, if you follow the guidance above, try to the request to [http://localhost:4000](http://localhost:4000) and have fun!!

## Authentication

For system authentication, it is import that there are two token: `access-token` and `refresh-token`. 

 * `Access token` will carry necessary token to access resource directly, and usually have short-lived time.

 * `Refresh token` are used to generate new access token after old one have expired or getting new resource for the first time. Opposite from access token, refresh token tend to have long-lived.

In this project, the account_id will be stored in access token for account verify, and the refresh token will also be store in database for token check. If refresh token are the same with the one in database, the system will generate new tokens. If not, the tokens store in cookie will be clear out.

In GraphQL, keyword `context` is an object shared by all the resolvers of a specific execution. Thus, we can input verify the access token at the middleware of express, and then put the decoded data in the context to pass it down.

## Reference

 * [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

 * [The Ultimate Guide to handling JWTs on frontend clients (GraphQL)](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#refresh_token_persistance)

 * [Comparision among Cookie, LocalStorage, and SessionStorage](https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-%E5%B7%AE%E7%95%B0-9e1d5df3dd7f)

 * [GraphQL tutorial](https://github.com/ian13456/modern-graphql-tutorial)

 * [Youtube tutorial: JWT Authetication Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified)
