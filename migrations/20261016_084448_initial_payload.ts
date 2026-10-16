import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "stackhouse_cms";
   CREATE TYPE "stackhouse_cms"."enum_posts_change_kind" AS ENUM('content', 'seo', 'geo', 'sources', 'correction');
  CREATE TYPE "stackhouse_cms"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "stackhouse_cms"."enum__posts_v_version_change_kind" AS ENUM('content', 'seo', 'geo', 'sources', 'correction');
  CREATE TYPE "stackhouse_cms"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "stackhouse_cms"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "stackhouse_cms"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "stackhouse_cms"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE "stackhouse_cms"."users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "reset_password_requested_at" timestamp(3) with time zone,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "stackhouse_cms"."media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "prefix" varchar DEFAULT '',
    "_objectkey" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_social_url" varchar,
    "sizes_social_width" numeric,
    "sizes_social_height" numeric,
    "sizes_social_mime_type" varchar,
    "sizes_social_filesize" numeric,
    "sizes_social_filename" varchar
  );

  CREATE TABLE "stackhouse_cms"."posts" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "h1" varchar,
    "slug" varchar,
    "description" varchar,
    "content" jsonb,
    "date" timestamp(3) with time zone,
    "updated" timestamp(3) with time zone,
    "category" varchar DEFAULT 'GEO',
    "author" varchar DEFAULT 'Ramón Arana',
    "read_time" varchar DEFAULT '5 min',
    "summary" varchar,
    "seo_canonical" varchar,
    "seo_noindex" boolean DEFAULT false,
    "seo_image_id" integer,
    "change_kind" "stackhouse_cms"."enum_posts_change_kind" DEFAULT 'content',
    "change_note" varchar,
    "original_mdx" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "stackhouse_cms"."enum_posts_status" DEFAULT 'draft'
  );

  CREATE TABLE "stackhouse_cms"."posts_texts" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "text" varchar
  );

  CREATE TABLE "stackhouse_cms"."_posts_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_h1" varchar,
    "version_slug" varchar,
    "version_description" varchar,
    "version_content" jsonb,
    "version_date" timestamp(3) with time zone,
    "version_updated" timestamp(3) with time zone,
    "version_category" varchar DEFAULT 'GEO',
    "version_author" varchar DEFAULT 'Ramón Arana',
    "version_read_time" varchar DEFAULT '5 min',
    "version_summary" varchar,
    "version_seo_canonical" varchar,
    "version_seo_noindex" boolean DEFAULT false,
    "version_seo_image_id" integer,
    "version_change_kind" "stackhouse_cms"."enum__posts_v_version_change_kind" DEFAULT 'content',
    "version_change_note" varchar,
    "version_original_mdx" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "stackhouse_cms"."enum__posts_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "stackhouse_cms"."_posts_v_texts" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "text" varchar
  );

  CREATE TABLE "stackhouse_cms"."redirects" (
    "id" serial PRIMARY KEY NOT NULL,
    "from" varchar NOT NULL,
    "to" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."changes" (
    "id" serial PRIMARY KEY NOT NULL,
    "post_id" integer NOT NULL,
    "url" varchar NOT NULL,
    "kind" varchar NOT NULL,
    "note" varchar,
    "editor" varchar,
    "published_at" timestamp(3) with time zone NOT NULL,
    "snapshot" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."payload_jobs_log" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "executed_at" timestamp(3) with time zone NOT NULL,
    "completed_at" timestamp(3) with time zone NOT NULL,
    "task_slug" "stackhouse_cms"."enum_payload_jobs_log_task_slug" NOT NULL,
    "task_i_d" varchar NOT NULL,
    "input" jsonb,
    "output" jsonb,
    "state" "stackhouse_cms"."enum_payload_jobs_log_state" NOT NULL,
    "error" jsonb
  );

  CREATE TABLE "stackhouse_cms"."payload_jobs" (
    "id" serial PRIMARY KEY NOT NULL,
    "input" jsonb,
    "completed_at" timestamp(3) with time zone,
    "total_tried" numeric DEFAULT 0,
    "has_error" boolean DEFAULT false,
    "error" jsonb,
    "task_slug" "stackhouse_cms"."enum_payload_jobs_task_slug",
    "queue" varchar DEFAULT 'default',
    "wait_until" timestamp(3) with time zone,
    "processing" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "posts_id" integer,
    "redirects_id" integer,
    "changes_id" integer
  );

  CREATE TABLE "stackhouse_cms"."payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "stackhouse_cms"."payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE "stackhouse_cms"."payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "stackhouse_cms"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "stackhouse_cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "stackhouse_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."_posts_v" ADD CONSTRAINT "_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "stackhouse_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."changes" ADD CONSTRAINT "changes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "stackhouse_cms"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "stackhouse_cms"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "stackhouse_cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "stackhouse_cms"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "stackhouse_cms"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "stackhouse_cms"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_changes_fk" FOREIGN KEY ("changes_id") REFERENCES "stackhouse_cms"."changes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "stackhouse_cms"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stackhouse_cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "stackhouse_cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "stackhouse_cms"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "stackhouse_cms"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "stackhouse_cms"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "stackhouse_cms"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "stackhouse_cms"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "stackhouse_cms"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "stackhouse_cms"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "stackhouse_cms"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "stackhouse_cms"."media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_social_sizes_social_filename_idx" ON "stackhouse_cms"."media" USING btree ("sizes_social_filename");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "stackhouse_cms"."posts" USING btree ("slug");
  CREATE INDEX "posts_seo_seo_image_idx" ON "stackhouse_cms"."posts" USING btree ("seo_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "stackhouse_cms"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "stackhouse_cms"."posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "stackhouse_cms"."posts" USING btree ("_status");
  CREATE INDEX "posts_texts_order_parent" ON "stackhouse_cms"."posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "stackhouse_cms"."_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "stackhouse_cms"."_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_seo_version_seo_image_idx" ON "stackhouse_cms"."_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "stackhouse_cms"."_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "stackhouse_cms"."_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "stackhouse_cms"."_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "stackhouse_cms"."_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "stackhouse_cms"."_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "stackhouse_cms"."_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "stackhouse_cms"."_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_texts_order_parent" ON "stackhouse_cms"."_posts_v_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "stackhouse_cms"."redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "stackhouse_cms"."redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "stackhouse_cms"."redirects" USING btree ("created_at");
  CREATE INDEX "changes_post_idx" ON "stackhouse_cms"."changes" USING btree ("post_id");
  CREATE INDEX "changes_updated_at_idx" ON "stackhouse_cms"."changes" USING btree ("updated_at");
  CREATE INDEX "changes_created_at_idx" ON "stackhouse_cms"."changes" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "stackhouse_cms"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "stackhouse_cms"."payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "stackhouse_cms"."payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "stackhouse_cms"."payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "stackhouse_cms"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "stackhouse_cms"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "stackhouse_cms"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_changes_id_idx" ON "stackhouse_cms"."payload_locked_documents_rels" USING btree ("changes_id");
  CREATE INDEX "payload_preferences_key_idx" ON "stackhouse_cms"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "stackhouse_cms"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "stackhouse_cms"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "stackhouse_cms"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "stackhouse_cms"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "stackhouse_cms"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "stackhouse_cms"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "stackhouse_cms"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "stackhouse_cms"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "stackhouse_cms"."users_sessions" CASCADE;
  DROP TABLE "stackhouse_cms"."users" CASCADE;
  DROP TABLE "stackhouse_cms"."media" CASCADE;
  DROP TABLE "stackhouse_cms"."posts" CASCADE;
  DROP TABLE "stackhouse_cms"."posts_texts" CASCADE;
  DROP TABLE "stackhouse_cms"."_posts_v" CASCADE;
  DROP TABLE "stackhouse_cms"."_posts_v_texts" CASCADE;
  DROP TABLE "stackhouse_cms"."redirects" CASCADE;
  DROP TABLE "stackhouse_cms"."changes" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_kv" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_jobs_log" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_jobs" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_locked_documents" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_preferences" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_preferences_rels" CASCADE;
  DROP TABLE "stackhouse_cms"."payload_migrations" CASCADE;
  DROP TYPE "stackhouse_cms"."enum_posts_change_kind";
  DROP TYPE "stackhouse_cms"."enum_posts_status";
  DROP TYPE "stackhouse_cms"."enum__posts_v_version_change_kind";
  DROP TYPE "stackhouse_cms"."enum__posts_v_version_status";
  DROP TYPE "stackhouse_cms"."enum_payload_jobs_log_task_slug";
  DROP TYPE "stackhouse_cms"."enum_payload_jobs_log_state";
  DROP TYPE "stackhouse_cms"."enum_payload_jobs_task_slug";`)
}
