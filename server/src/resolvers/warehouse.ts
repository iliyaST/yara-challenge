import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { ProductType, Warehouse } from "../entities/Warehouse";

@ObjectType()
class UpdateWarehouseResponse {
  @Field()
  id!: Number;
}

@Resolver()
export class WarehouseResolver {
  @Query(() => [Warehouse])
  async warehouses() {
    const result = await Warehouse.find();
    return result;
  }

  @Mutation(() => Warehouse)
  async createWarehouse(@Arg("name") name: string, @Arg("size") size: number) {
    const warehouse = await Warehouse.create({ name, size }).save();
    return warehouse;
  }

  @Mutation(() => UpdateWarehouseResponse)
  async updateWarehouse(
    @Arg("warehouseId") warehouseId: number,
    @Arg("productTypes") productTypes: ProductType,
    @Arg("size") size: number
  ) {
    await Warehouse.update(
      { id: warehouseId },
      { productTypes: productTypes, size }
    );
    return { id: warehouseId };
  }
}
