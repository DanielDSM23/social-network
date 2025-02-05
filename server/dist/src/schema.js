import gql from "graphql-tag";
export const typeDefs = gql `
type User {
    id: ID!
    username: String!
    email: String!
    bio: String!
    createdAt: String
    tweets: [Tweet!]
}

type Tweet {
    id: ID!
    userId: ID!
    content: String!
    createdAt: String
    likes: [Like!]
    comments: [Comment!]
}

type Like {
    userId: ID!
    tweetId: ID!
    createdAt: String
}

type Comment {
    id: ID!
    userId: ID!
    tweetId: ID!
    content: String!
    createdAt: String
}


type Query {
    getUserById(id: ID!): User
    getAllUser:[User!]
    getTweetByTweetId(id: ID!): Tweet
    getTweetByUserId(id: ID!): [Tweet]
    getAllTweets: [Tweet!]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, bio: String!): CreateUserResponse
    createTweet(userId: ID!, content: String!): CreateTweetResponse 
    likeTweet(userId: ID!, tweetId: ID!): CreateLikeResponse
    commentTweet(userId: ID!, tweetId: ID!, content: String!): CreateCommentResponse
    signIn(username: String!, password: String!): SignInUserResponse
}

type Response{
    code: Int!
    success: Boolean!
    message: String!
}

type CreateUserResponse{
    response:Response
    user: User
}

type CreateTweetResponse{
    response:Response
    tweet:Tweet
}

type CreateLikeResponse{
    response:Response
    like:Like
}

type CreateCommentResponse{
    response: Response
    comment: Tweet
}

type SignInUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
}


`;
