import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { Product } from "./entities/Product";

export default defineConfig({
  migrations: {
    path: "./src/migrations",
    glob: "!(*.d).{js,ts}",
  },
  entities: [Product],
  dbName: "yara-challenge-db",
  debug: true,
  extensions: [Migrator],
  password: "admin",
});
