require("dotenv").config();

import "reflect-metadata";
import { DataSource } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";
import { WarehouseResolver } from "./resolvers/warehouse";

import cors from "cors";
import { Product } from "./entities/Product";
import { Warehouse } from "./entities/Warehouse";

const main = async () => {
  const appDataSource = new DataSource({
    type: "postgres",
    database: "yara-db",
    username: "postgres",
    password: "admin",
    synchronize: true,
    logging: true,
    entities: [Product, Warehouse],
  });

  await appDataSource.initialize();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, WarehouseResolver],
      validate: false,
    }),
  });

  app.use(
    cors({
      origin: [
        process.env.CLIENT_URL || "",
        "https://studio.apollographql.com",
      ],
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4431, () => {
    console.log("\x1b[36m%s\x1b[0m", "Listening on port 4431...");
    console.log("\x1b[36m%s\x1b[0m", "Client is on:", process.env.CLIENT_URL);
  });
};

main();
