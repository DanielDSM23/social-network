import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  tweet: Tweet;
  tweetId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserDetail>;
};

export type Follower = {
  __typename?: 'Follower';
  createdAt?: Maybe<Scalars['String']['output']>;
  follower: User;
  followerId: Scalars['ID']['output'];
  following: User;
  followingId: Scalars['ID']['output'];
};

export type Like = {
  __typename?: 'Like';
  createdAt?: Maybe<Scalars['String']['output']>;
  tweet: Tweet;
  tweetId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentTweet: Comment;
  createTweet: Tweet;
  createUser?: Maybe<CreateUserResponse>;
  followUser: Follower;
  likeTweet: Like;
  retweet: Retweet;
};


export type MutationCommentTweetArgs = {
  content: Scalars['String']['input'];
  tweetId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateTweetArgs = {
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  bio: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  followerId: Scalars['ID']['input'];
  followingId: Scalars['ID']['input'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRetweetArgs = {
  tweetId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTweet?: Maybe<Tweet>;
  getTweets?: Maybe<Array<Tweet>>;
  getUser?: Maybe<User>;
};


export type QueryGetTweetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type Retweet = {
  __typename?: 'Retweet';
  createdAt?: Maybe<Scalars['String']['output']>;
  tweet: Tweet;
  tweetId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Tweet = {
  __typename?: 'Tweet';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Like>>;
  retweets?: Maybe<Array<Retweet>>;
  user: User;
  userId: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String']['output'];
  comments?: Maybe<Array<Comment>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  followers?: Maybe<Array<Follower>>;
  following?: Maybe<Array<Follower>>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Like>>;
  password: Scalars['String']['output'];
  retweets?: Maybe<Array<Retweet>>;
  tweets?: Maybe<Array<Tweet>>;
  username: Scalars['String']['output'];
};

export type UserDetail = {
  __typename?: 'UserDetail';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  Follower: ResolverTypeWrapper<Follower>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Retweet: ResolverTypeWrapper<Retweet>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tweet: ResolverTypeWrapper<Tweet>;
  User: ResolverTypeWrapper<User>;
  UserDetail: ResolverTypeWrapper<UserDetail>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CreateUserResponse: CreateUserResponse;
  Follower: Follower;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  Mutation: {};
  Query: {};
  Retweet: Retweet;
  String: Scalars['String']['output'];
  Tweet: Tweet;
  User: User;
  UserDetail: UserDetail;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Follower'] = ResolversParentTypes['Follower']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  followerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  followingId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  commentTweet?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentTweetArgs, 'content' | 'tweetId' | 'userId'>>;
  createTweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'content' | 'userId'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'bio' | 'email' | 'password' | 'username'>>;
  followUser?: Resolver<ResolversTypes['Follower'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'followerId' | 'followingId'>>;
  likeTweet?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationLikeTweetArgs, 'tweetId' | 'userId'>>;
  retweet?: Resolver<ResolversTypes['Retweet'], ParentType, ContextType, RequireFields<MutationRetweetArgs, 'tweetId' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<QueryGetTweetArgs, 'id'>>;
  getTweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
};

export type RetweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Retweet'] = ResolversParentTypes['Retweet']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  retweets?: Resolver<Maybe<Array<ResolversTypes['Retweet']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<ResolversTypes['Follower']>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<ResolversTypes['Follower']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retweets?: Resolver<Maybe<Array<ResolversTypes['Retweet']>>, ParentType, ContextType>;
  tweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDetail'] = ResolversParentTypes['UserDetail']> = {
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Follower?: FollowerResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Retweet?: RetweetResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDetail?: UserDetailResolvers<ContextType>;
};

