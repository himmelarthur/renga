# Migration `20200421191856-add-deletion-field`

This migration has been generated by Vincent Poulain at 4/21/2020, 7:18:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "renga"."Renga" ADD COLUMN "deletedAt" timestamp(3)   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200412194056-initial-migration..20200421191856-add-deletion-field
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -29,8 +29,9 @@
 model Renga {
   id          Int          @default(autoincrement()) @id
   createdAt   DateTime     @default(now())
   updatedAt   DateTime     @updatedAt
+  deletedAt   DateTime?
   emojis      String[]
   submissions Submission[]
   movie       Movie        @relation(fields: [movieId], references: [id])
   movieId     Int
```
