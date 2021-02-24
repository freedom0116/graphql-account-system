export const Query = {
  hello: (_, { name }) => `Hello ${name || "world"}`
}