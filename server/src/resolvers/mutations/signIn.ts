import { comparePasswords, createJWT, getUser } from "../../modules/auth.js"
import { MutationResolvers } from "../../types"

export const signIn: MutationResolvers['signIn'] = async (_, {username, password}, {dataSources}) => {
    try {
      const user = await dataSources.db.user.findFirstOrThrow({where: {username}})
    
      const isValidPassword = await comparePasswords(password, user.password)
    
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }
    
      const token = createJWT(user)
      return {
        code: 200,
        message: 'User is signed in',
        success: true,
        token,
        userId: user.id,
      }
    } catch(e) {
      console.log("Sign-in error", e)
      return {
        code: 401,
        message: 'User not auth',
        success: false,
        token: null,
        userId: null
      }
    }
  }