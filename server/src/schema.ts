import gql from "graphql-tag";
 
export const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    bio: String!
    createdAt: String
    tweets: [Tweet!]
    followers: [Follower!]
    following: [Follower!]
    likes: [Like!]
    comments: [Comment!]
    retweets: [Retweet!]
}

type Tweet {
    id: ID!
    user: User!
    userId: ID!
    content: String!
    createdAt: String
    likes: [Like!]
    comments: [Comment!]
    retweets: [Retweet!]
}

type Like {
    user: User!
    userId: ID!
    tweet: Tweet!
    tweetId: ID!
    createdAt: String
}

type Comment {
    id: ID!
    user: User!
    userId: ID!
    tweet: Tweet!
    tweetId: ID!
    content: String!
    createdAt: String
}

type Retweet {
    user: User!
    userId: ID!
    tweet: Tweet!
    tweetId: ID!
    createdAt: String
}

type Follower {
    follower: User!
    followerId: ID!
    following: User!
    followingId: ID!
    createdAt: String
}

type Query {
    getUserById(id: ID!): User
    getAllUser:[User!]
    getTweet(id: ID!): Tweet
    getTweets: [Tweet!]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, bio: String!): CreateUserResponse
    createTweet(userId: ID!, content: String!): CreateTweetResponse 
    likeTweet(userId: ID!, tweetId: ID!): Like!
    commentTweet(userId: ID!, tweetId: ID!, content: String!): Comment!
    retweet(userId: ID!, tweetId: ID!): Retweet!
    followUser(followerId: ID!, followingId: ID!): Follower!
}

type Response{
    code: Int!
    success: Boolean!
    message: String!
}

type CreateUserResponse{
    response:Response
    user: UserDetail
}

type CreateTweetResponse{
    response:Response
    tweet:Tweet
}


type UserDetail{
    id: ID!
    username: String!
    email: String!
    bio: String!
}

`;
