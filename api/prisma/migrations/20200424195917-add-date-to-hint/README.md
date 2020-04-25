# Migration `20200424195917-add-date-to-hint`

This migration has been generated by Vincent Poulain at 4/24/2020, 7:59:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "renga"."Hint" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200424193647-backtohint-count..20200424195917-add-date-to-hint
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
@@ -48,8 +48,10 @@
 }
 model Hint {
   id      Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   user    User     @relation(fields: [userId], references: [id])
   userId  Int
   renga   Renga    @relation(fields: [rengaId], references: [id])
   rengaId Int
```