import { Product } from "../entities/Product";
import { ContextType } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(@Ctx() { em }: ContextType) {
    return await em.find(Product, {});
  }

  @Mutation(() => [Product])
  async createProduct(@Arg("name") name: string, @Ctx() { em }: ContextType) {
    const product = em.create(Product, { name });
    await em.persistAndFlush(product);
    return product;
  }
}
