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
  tweetId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type CreateTweetResponse = {
  __typename?: 'CreateTweetResponse';
  response?: Maybe<Response>;
  tweet?: Maybe<Tweet>;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  response?: Maybe<Response>;
  user?: Maybe<User>;
};

export type Like = {
  __typename?: 'Like';
  createdAt?: Maybe<Scalars['String']['output']>;
  tweetId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentTweet: Comment;
  createTweet?: Maybe<CreateTweetResponse>;
  createUser?: Maybe<CreateUserResponse>;
  likeTweet: Like;
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


export type MutationLikeTweetArgs = {
  tweetId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTweets?: Maybe<Array<Tweet>>;
  getAllUser?: Maybe<Array<User>>;
  getTweetByTweetId?: Maybe<Tweet>;
  getTweetByUserId?: Maybe<Array<Maybe<Tweet>>>;
  getUserById?: Maybe<User>;
};


export type QueryGetTweetByTweetIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTweetByUserIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Tweet = {
  __typename?: 'Tweet';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Like>>;
  userId: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tweets?: Maybe<Array<Tweet>>;
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
  CreateTweetResponse: ResolverTypeWrapper<CreateTweetResponse>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tweet: ResolverTypeWrapper<Tweet>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CreateTweetResponse: CreateTweetResponse;
  CreateUserResponse: CreateUserResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  Mutation: {};
  Query: {};
  Response: Response;
  String: Scalars['String']['output'];
  Tweet: Tweet;
  User: User;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTweetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTweetResponse'] = ResolversParentTypes['CreateTweetResponse']> = {
  response?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  tweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  response?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  commentTweet?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentTweetArgs, 'content' | 'tweetId' | 'userId'>>;
  createTweet?: Resolver<Maybe<ResolversTypes['CreateTweetResponse']>, ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'content' | 'userId'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'bio' | 'email' | 'password' | 'username'>>;
  likeTweet?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationLikeTweetArgs, 'tweetId' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllTweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  getAllUser?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  getTweetByTweetId?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<QueryGetTweetByTweetIdArgs, 'id'>>;
  getTweetByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tweet']>>>, ParentType, ContextType, RequireFields<QueryGetTweetByUserIdArgs, 'id'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CreateTweetResponse?: CreateTweetResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

