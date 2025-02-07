import {CodegenConfig} from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context#DataSourceContext',
        mappers: {
          User: './models#UserModel',
          Tweet: './models#TweetModel',
          Like: './models#LikeModel',
          Comment: './models#CommentModel
        }
      }
    }
  }
}
 
export default config