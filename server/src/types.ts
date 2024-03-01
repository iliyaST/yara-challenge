import { PostgreSqlDriver, SqlEntityManager } from "@mikro-orm/postgresql";

export type ContextType = {
  em: SqlEntityManager<PostgreSqlDriver>;
};
