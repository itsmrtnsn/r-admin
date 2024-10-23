/*
  Warnings:

  - You are about to drop the column `saleAmount` on the `Sale` table. All the data in the column will be lost.
  - You are about to alter the column `reference` on the `Sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(12)` to `VarChar(10)`.

*/
-- CreateEnum
CREATE TYPE "Discount" AS ENUM ('FIXED', 'PERCENTAGE');

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "saleAmount",
ADD COLUMN     "discountType" "Discount",
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "reference" SET DATA TYPE VARCHAR(10);
