import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "./modules/auth";


export type DataSourceContext = {
    user: AuthenticatedUser | null
    dataSources: {
      db: PrismaClient
    }
  };