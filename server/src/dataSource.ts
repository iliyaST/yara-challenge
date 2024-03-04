import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

let connectionOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "admin",
  database: "yara-db",
  synchronize: false,
  logging: true,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/db/migrations/*{.ts,.js}"],
};

export default new DataSource({
  ...connectionOptions,
});
