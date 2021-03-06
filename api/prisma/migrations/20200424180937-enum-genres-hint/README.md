# Migration `20200424180937-enum-genres-hint`

This migration has been generated by Vincent Poulain at 4/24/2020, 6:09:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "HintType" ADD VALUE 'GENRES'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200424160746-change-genre..20200424180937-enum-genres-hint
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
@@ -40,8 +40,23 @@
   party       Party        @relation(fields: [partyId], references: [id])
   partyId     String
 }
+enum HintType {
+  TIMELINE
+  YEAR
+  GENRES
+}
+
+model Hint {
+  id      Int      @default(autoincrement()) @id
+  user    User     @relation(fields: [userId], references: [id])
+  userId  Int
+  renga   Renga    @relation(fields: [rengaId], references: [id])
+  rengaId Int
+  type    HintType
+}
+
 model User {
   id        Int      @default(autoincrement()) @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
```
