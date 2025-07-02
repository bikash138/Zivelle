-- CreateEnum
CREATE TYPE "ListStatus" AS ENUM ('Active', 'Draft', 'Sold');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "status" "ListStatus" NOT NULL DEFAULT 'Draft';
