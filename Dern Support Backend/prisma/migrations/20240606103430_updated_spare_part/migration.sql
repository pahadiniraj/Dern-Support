/*
  Warnings:

  - You are about to alter the column `price` on the `SparePart` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `weight` on the `SparePart` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "SparePart" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DATA TYPE INTEGER;
