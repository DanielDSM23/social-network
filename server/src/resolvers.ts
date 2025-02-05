import { hashPassword } from "./modules/auth.js";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createUser: async (_, { username, email, password, bio }, context) => {
      try {
        // Création de l'utilisateur dans la base de données
        const createdUser = await context.dataSources.db.user.create({
          data: {
            username,
            password: await hashPassword(password), 
            bio, 
            email
          }
        });

        // Retour du succès avec un utilisateur créé
        return {
          code: 201,
          message: `User ${username} has been created`,
          success: true,
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
