/*
  Warnings:

  - You are about to drop the column `response` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "response",
DROP COLUMN "user_id";
