import { AuthenticatedUser } from "./modules/auth";


export type DataSourceContext = {
    user: AuthenticatedUser | null
  };