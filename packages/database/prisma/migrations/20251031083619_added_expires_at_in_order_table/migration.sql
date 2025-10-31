-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ALTER COLUMN "razorpayOrderId" DROP NOT NULL;
