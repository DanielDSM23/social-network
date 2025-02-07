import { hashPassword } from "./modules/auth.js";
import { Resolvers } from "./types";
import { signIn } from "./resolvers/mutations/signIn.js";
import { log } from "console";

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

      getUserById: async (_, __, { user, dataSources }) => {
        try {
          if (!user || !user.id) {
            throw new Error("Non authentifié. Token invalide ou manquant.");
          }
      
          const userData = await dataSources.db.user.findUnique({
            where: { id: user.id }, 
          });
      
          if (!userData) {
            throw new Error("Utilisateur non trouvé.");
          }
      
          return userData;
        } catch (e) {
          console.log("Erreur lors de la récupération de l'utilisateur :", e);
          throw new Error("Impossible de récupérer les informations de l'utilisateur.");
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

    User:{
      tweets:async (parent, __, { dataSources }) => {
        try {
          const tweets = await dataSources.db.tweet.findMany({
            where: { userId: parent.id }
          });

          if (tweets.length === 0) {
            throw new Error(`Aucun tweet trouvé pour l'utilisateur avec l'ID ${parent.id}`);
          }
          return tweets;
        } catch (e) {
          console.log("Erreur lors de la récupération des tweets de l'utilisateur", e.message);
          throw new Error("Impossible de récupérer les tweets de l'utilisateur");
        }
      }
    },

    Tweet:{
      likes:async(parent,__,{dataSources}) => {
        try{
          console.log(parent);
          const likes = await dataSources.db.like.findMany({
          where:{
            tweetId: parent.id
          }
          });
          return likes
        }catch(e){
          console.log("Erreur lors de la récupération des likes du tweet", e.message);
          throw new Error("Impossible de récupérer les likes du tweet ");
        }
      },

      comments:async(parent,__,{dataSources}) => {
        try{
          const comment = await dataSources.db.comment.findMany({
          where:{
            tweetId: parent.id
          }
          });
          return comment
        }catch(e){
          console.log("Erreur lors de la récupération des commentaires du tweet", e.message);
          throw new Error("Impossible de récupérer les commentaire du tweet ");
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

    createTweet: async (_,{content},context) => {
      if(!context.user){
        throw new Error("Unauthorized: You must be logged in to create a tweet.");
      }
      try {
        const createdTweet = await context.dataSources.db.tweet.create({
          data:{
            userId: context.user.id,
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

    deleteTweet: async (_,{id},context) => {
      if(!context.user){
        throw new Error("Unauthorized: You must be logged in to create a tweet.");
      }
      try {
        const tweet = await context.dataSources.db.tweet.findUnique({
          where: { id, userId: context.user.id}
        });
  
        if (!tweet) {
          throw new Error(`Le tweet avec l'ID ${id} n'existe pas.`);
        }
        await context.dataSources.db.tweet.delete({
          where: { id , userId: context.user.id}
        });
  
        return {
          code : 200,
          success: true,
          message: "Tweet supprimé avec succès",
        };
      } 
      catch (e) {
        console.log("Erreur lors de la suppression du tweet", e.message);
        return {
          code : 500,
          success: false,
          message: "Problem with delete tweet",
        };
      }
    },

    likeTweet: async(_,{tweetId},context) => {
      try{
        if(!context.user){
          throw new Error("Unauthorized: You must be logged in to like a tweet.");
        }
        const likedTweet = await context.dataSources.db.like.create({
          data:{
            userId:context.user.id,
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
    signIn,
    commentTweet: async(_,{tweetId,content},context) => {
      try{
        if(!context.user){
          throw new Error("Unauthorized: You must be logged in to like a tweet.");
        }
        const commentedTweet = await context.dataSources.db.comment.create({
          data:{
            userId:context.user.id,
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
          comment: {
            id :commentedTweet.id,
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
            comment:null
          };
      }
    }

  

    
  }
};
