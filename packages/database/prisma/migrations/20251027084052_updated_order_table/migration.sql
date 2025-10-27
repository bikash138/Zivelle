/*
  Warnings:

  - You are about to drop the column `deliveryAddressId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryAddressId",
ADD COLUMN     "deliveryAddress" JSONB NOT NULL;
