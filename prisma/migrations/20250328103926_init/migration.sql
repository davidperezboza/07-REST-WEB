/*
  Warnings:

  - You are about to drop the column `completedA` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "completedA",
ADD COLUMN     "completedAt" TIMESTAMP;
