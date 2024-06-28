/*
  Warnings:

  - Added the required column `inStock` to the `SparePart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `SparePart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SparePart" ADD COLUMN     "inStock" BOOLEAN NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
