/*
  Warnings:

  - You are about to drop the column `change` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "change",
ADD COLUMN     "customerChange" INTEGER NOT NULL DEFAULT 0;
