import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "stackhouse_cms"."sections" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "body" varchar NOT NULL,
    "source_name" varchar,
    "source_u_r_l" varchar,
    "active" boolean DEFAULT true,
    "change_note" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."_sections_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar NOT NULL,
    "version_body" varchar NOT NULL,
    "version_source_name" varchar,
    "version_source_u_r_l" varchar,
    "version_active" boolean DEFAULT true,
    "version_change_note" varchar NOT NULL,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "stackhouse_cms"."posts" ADD COLUMN "custom_schema" jsonb;
  ALTER TABLE "stackhouse_cms"."_posts_v" ADD COLUMN "version_custom_schema" jsonb;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD COLUMN "sections_id" integer;
  ALTER TABLE "stackhouse_cms"."_sections_v" ADD CONSTRAINT "_sections_v_parent_id_sections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."sections"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sections_updated_at_idx" ON "stackhouse_cms"."sections" USING btree ("updated_at");
  CREATE INDEX "sections_created_at_idx" ON "stackhouse_cms"."sections" USING btree ("created_at");
  CREATE INDEX "_sections_v_parent_idx" ON "stackhouse_cms"."_sections_v" USING btree ("parent_id");
  CREATE INDEX "_sections_v_version_version_updated_at_idx" ON "stackhouse_cms"."_sections_v" USING btree ("version_updated_at");
  CREATE INDEX "_sections_v_version_version_created_at_idx" ON "stackhouse_cms"."_sections_v" USING btree ("version_created_at");
  CREATE INDEX "_sections_v_created_at_idx" ON "stackhouse_cms"."_sections_v" USING btree ("created_at");
  CREATE INDEX "_sections_v_updated_at_idx" ON "stackhouse_cms"."_sections_v" USING btree ("updated_at");
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "stackhouse_cms"."sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sections_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("sections_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stackhouse_cms"."sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stackhouse_cms"."_sections_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "stackhouse_cms"."sections" CASCADE;
  DROP TABLE "stackhouse_cms"."_sections_v" CASCADE;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sections_fk";

  DROP INDEX "stackhouse_cms"."payload_locked_documents_rels_sections_id_idx";
  ALTER TABLE "stackhouse_cms"."posts" DROP COLUMN "custom_schema";
  ALTER TABLE "stackhouse_cms"."_posts_v" DROP COLUMN "version_custom_schema";
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" DROP COLUMN "sections_id";`)
}
