export type UserModel = {
    id: string;
    username: string;
    email: string;
    bio: string;
    createdAt?: Date;
    tweets?: TweetModel[];
  };
  
  export type TweetModel = {
    id: string;
    userId: string;
    content: string;
    createdAt?: Date;
    likes?: LikeModel[];
    comments?: CommentModel[];
  };
  
  export type LikeModel = {
    userId: string;
    tweetId: string;
    createdAt?: Date;
  };
  
  export type CommentModel = {
    id: string;
    userId: string;
    tweetId: string;
    content: string;
    createdAt?: Date;
  };
  