/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `costPrice` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `price` DOUBLE NOT NULL;
