# Migration `20200507142039-add-account`

This migration has been generated by Vincent Poulain at 5/7/2020, 2:20:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Account" (
    "auth0id" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "id" SERIAL,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
)

ALTER TABLE "public"."Renga" DROP COLUMN "userId";

ALTER TABLE "public"."User" ADD COLUMN "accountId" integer   ;

CREATE UNIQUE INDEX "Account.auth0id" ON "public"."Account"("auth0id")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("accountId")REFERENCES "public"."Account"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200429163332-remove-useless-user-id-remove-useless-user-id..20200507142039-add-account
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
@@ -26,22 +26,25 @@
   rengas    Renga[]
 }
 model Renga {
-  id          Int          @default(autoincrement()) @id
-  createdAt   DateTime     @default(now())
-  updatedAt   DateTime     @updatedAt
-  deletedAt   DateTime?
-  emojis      String[]
-  submissions Submission[]
-  movie       Movie        @relation(fields: [movieId], references: [id])
-  movieId     Int
-  author      User         @relation(fields: [authorId], references: [id])
-  authorId    Int
-  party       Party        @relation(fields: [partyId], references: [id])
-  partyId     String
-  likedBy     User[]       @relation("likes", references: [id])
-  likeCount   Int          @default(0)
+  id           Int          @default(autoincrement()) @id
+  createdAt    DateTime     @default(now())
+  updatedAt    DateTime     @updatedAt
+  deletedAt    DateTime?
+  emojis       String[]
+  submissions  Submission[]
+  movie        Movie        @relation(fields: [movieId], references: [id])
+  movieId      Int
+  author       User         @relation(fields: [authorId], references: [id])
+  authorId     Int
+  party        Party        @relation(fields: [partyId], references: [id])
+  partyId      String
+  likedBy      User[]       @relation("likes", references: [id])
+  likeCount    Int          @default(0)
+  solverCount  Int          @default(0)
+  attemptCount Int          @default(0)
+  successRatio Float        @default(0)
 }
 enum HintType {
   TIMELINE
@@ -63,18 +66,20 @@
   @@index([userId], name: "Hint_User_fkey")
 }
 model User {
-  id        Int      @default(autoincrement()) @id
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  username  String
-  party     Party    @relation(fields: [partyId], references: [id])
-  partyId   String
-  score     Int      @default(0)
-  rengas    Renga[]
-  hintCount Int      @default(3)
-  likes     Renga[]  @relation("likes", references: [id])
+  id         Int          @default(autoincrement()) @id
+  createdAt  DateTime     @default(now())
+  updatedAt  DateTime     @updatedAt
+  username   String
+  party      Party        @relation(fields: [partyId], references: [id])
+  partyId    String
+  score      Int          @default(0)
+  rengas     Renga[]
+  hintCount  Int          @default(3)
+  likes      Renga[]      @relation("likes", references: [id])
+  account    Account?      @relation(fields: [accountId], references: [id])
+  accountId  Int?
 }
 model Submission {
   id         Int      @default(autoincrement()) @id
@@ -88,5 +93,14 @@
   movieTitle String
   movieDBId  Int
   @@index([rengaId], name: "Renga_fkey")
+}
+
+model Account {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  auth0id   String   @unique
+  players   User[]
+  email     String
 }
```
