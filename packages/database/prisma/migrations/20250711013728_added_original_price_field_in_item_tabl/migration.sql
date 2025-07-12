/*
  Warnings:

  - You are about to drop the column `thumnail` on the `Item` table. All the data in the column will be lost.
  - Added the required column `originalPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "thumnail",
ADD COLUMN     "originalPrice" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
