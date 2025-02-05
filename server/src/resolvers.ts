import { hashPassword } from "./modules/auth.js";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query:{
      
      getAllUser: async (_,__,{dataSources}) => {
        try{
          const users = await dataSources.db.user.findMany();
          return users
        } catch (e){
          console.log("erreur à la récupérations des users",e);
          throw new Error("Impossible de récupérer la liste des users");
        }
      },

      getUserById: async (_,{id},{dataSources}) => {
        try{
          const users = await dataSources.db.user.findUnique({
            where:{id:id}
          })
          return users
        } catch(e){
          console.log("erreur à la récupérations du user",e);
          throw new Error("Impossible de récupérer le user");
        }
      },

      getAllTweets: async (_,__,{dataSources}) => {
        try{
          const tweets = await dataSources.db.tweet.findMany();
          return tweets;
        } catch(e){
          console.log("erreur à la récupérations des tweets",e);
          throw new Error("Impossible de récupérer les tweets");
        }
      },

      getTweetByUserId: async (_,{id},{dataSources}) => {
        try{
          const tweets = await dataSources.db.tweet.findMany({
            where:{userId:id}
          })
          if (tweets.length === 0) {
            throw new Error(`Aucun tweet trouvé pour l'utilisateur avec l'ID ${id}`);
          }
          return tweets;
        } catch(e){
          console.log("erreur à la récupérations du tweet par le ID user",e.message);
          throw new Error("Impossible de récupérer le tweet par le ID User");
        }
      },

      getTweetByTweetId: async (_,{id},{dataSources}) => {
        try{
          const tweet = await dataSources.db.tweet.findUnique({
            where:{id:id}
          })
          return tweet;
        } catch(e){
          console.log("erreur à la récupérations du tweet par le ID tweet",e.message);
          throw new Error("Impossible de récupérer le tweet par le ID tweet");
        }
      },
    },

   

  Mutation: {
    createUser: async (_, { username, email, password, bio }, context) => {
      try {
        const createdUser = await context.dataSources.db.user.create({
          data: {
            username,
            password: await hashPassword(password), 
            bio, 
            email
          }
        });

        return {
          response:{
            code: 201,
            message: `User ${username} has been created`,
            success: true,
          },
          user: {
            id: createdUser.id,
            username: createdUser.username,
            bio: createdUser.bio,
            email: createdUser.email,
          }
        };
      } catch (error) {
        return {
          response:{
            code: 400,
            message: 'Something bad happened',
            success: false,
          },          
          user: null
        };
      }
    },

    createTweet: async (_,{userId,content},context) => {
      try {
        const createdTweet = await context.dataSources.db.tweet.create({
          data:{
            userId,
            content
          }
        });

        return{
          response:{
            code: 201,
            message: `Tweet has been created`,
            success: true,
          },
          tweet: {
            id: createdTweet.id,
            content: createdTweet.content,
            user : createdTweet.user,
            userId:createdTweet.userId
          }
        };
        } catch(e){
          console.log("erreur à la création du tweet",e);
          return {
            response:{
              code: 400,
              message: `Problem with the creation of the tweet`,
              success: false,
            },
            tweet: null
          };
        }
    },


    likeTweet: async(_,{userId,tweetId},context) => {
      try{
        const likedTweet = await context.dataSources.db.like.create({
          data:{
            userId:userId,
            tweetId:tweetId
          }
        });

        return{
          response:{
            code: 201,
            message: `Tweet has been created`,
            success: true,
          },
          like: {
            userId:likedTweet.userId,
            tweetId:likedTweet.tweetId,
            createdAt:likedTweet.createdAt
          }
        };

      }catch(e){
        console.log("erreur au like d'un tweet",e.message);
          return {
            response:{
              code: 400,
              message: `Problem with the like of a tweet`,
              success: false,
            },
            like:null
          };
      }
    },
    commentTweet: async(_,{userId,tweetId,content},context) => {
      try{
        const commentedTweet = await context.dataSources.db.comment.create({
          data:{
            userId:userId,
            tweetId:tweetId,
            content
          }
        });

        return{
          response:{
            code: 201,
            message: `Comment has been created`,
            success: true,
          },
          like: {
            userId:commentedTweet.userId,
            tweetId:commentedTweet.tweetId,
            content:commentedTweet.content,
            createdAt:commentedTweet.createdAt
          }
        };

      }catch(e){
        console.log("erreur au commentaire d'un tweet",e.message);
          return {
            response:{
              code: 400,
              message: `Problem with the comment of a tweet`,
              success: false,
            },
            like:null
          };
      }
    }

  

    
  }
};
