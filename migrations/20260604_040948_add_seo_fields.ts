import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blogs" ADD COLUMN "meta_title" varchar;
    ALTER TABLE "blogs" ADD COLUMN "meta_description" varchar;
    ALTER TABLE "blogs" ADD COLUMN "meta_image_id" integer;

    ALTER TABLE "blogs" ADD CONSTRAINT "blogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "blogs_meta_meta_image_idx" ON "blogs" USING btree ("meta_image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "blogs_meta_meta_image_idx";
    ALTER TABLE "blogs" DROP CONSTRAINT IF EXISTS "blogs_meta_image_id_media_id_fk";
    ALTER TABLE "blogs" DROP COLUMN IF EXISTS "meta_image_id";
    ALTER TABLE "blogs" DROP COLUMN IF EXISTS "meta_description";
    ALTER TABLE "blogs" DROP COLUMN IF EXISTS "meta_title";
  `)
}
