import { comparePasswords, createJWT } from "../../modules/auth.js";
export const signIn = async (_, { username, password }, { dataSources }) => {
    try {
        const user = await dataSources.db.user.findFirstOrThrow({ where: { username } });
        console.log(user);
        const isValidPassword = comparePasswords(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const token = createJWT(user);
        return {
            code: 200,
            message: 'User is signed in',
            success: true,
            token,
        };
    }
    catch {
        return {
            code: 401,
            message: 'User not auth',
            success: false,
            token: null
        };
    }
};
