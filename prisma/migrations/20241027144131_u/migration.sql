/*
  Warnings:

  - You are about to drop the column `discountType` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `discountValue` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Sale` DROP COLUMN `discountType`,
    DROP COLUMN `discountValue`,
    ADD COLUMN `discount` DOUBLE NULL;
