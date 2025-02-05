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
      }
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
        // Retour en cas d'erreur
        return {
          code: 400,
          message: 'Something bad happened',
          success: false,
          user: null
        };
      }
    },
  }
};
