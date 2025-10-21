/*
  Warnings:

  - The values [Reserved] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Confirmed', 'Shipped', 'Delivered', 'Pending', 'Cancelled');
ALTER TABLE "Order" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "OrderItem" ALTER COLUMN "itemStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "orderStatus" TYPE "OrderStatus_new" USING ("orderStatus"::text::"OrderStatus_new");
ALTER TABLE "OrderItem" ALTER COLUMN "itemStatus" TYPE "OrderStatus_new" USING ("itemStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "orderStatus" SET DEFAULT 'Pending';
ALTER TABLE "OrderItem" ALTER COLUMN "itemStatus" SET DEFAULT 'Pending';
COMMIT;
