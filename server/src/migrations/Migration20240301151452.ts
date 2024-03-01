import { Migration } from "@mikro-orm/migrations";

export class Migration20240301151452 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product" ("id" serial primary key, "created_at" date not null, "updated_at" date not null, "name" text not null);'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }
}
