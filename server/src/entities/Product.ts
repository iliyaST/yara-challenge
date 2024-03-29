import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Warehouse } from "./Warehouse";

export type ProductType = "hazardous" | "non-hazardous";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field()
  @Column({ unique: true, type: "text" })
  name!: string;

  @Field()
  @Column()
  type!: ProductType;

  @Field()
  @Column()
  sizePerUnit!: number;

  @Field()
  @Column()
  exported!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  warehouseId?: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @JoinColumn({ name: "warehouseId" })
  warehouse: Warehouse;
}
