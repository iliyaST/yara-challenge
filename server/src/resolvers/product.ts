import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Product, ProductType } from "../entities/Product";

@ObjectType()
class UpdateProductResponse {
  @Field()
  id!: Number;
}

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return await Product.find();
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("name") name: string,
    @Arg("sizePerUnit") sizePerUnit: number,
    @Arg("type") type: ProductType
  ) {
    const product = await Product.create({
      name,
      sizePerUnit,
      type,
      exported: false,
    }).save();
    return product;
  }

  @Mutation(() => UpdateProductResponse)
  async updateProductExportStatus(
    @Arg("productId") productId: number,
    @Arg("exported") exported: boolean,
    @Arg("warehouseId") warehouseId: number
  ) {
    await Product.update({ id: productId }, { exported, warehouseId });
    return { id: productId };
  }
}
