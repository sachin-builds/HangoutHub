/*
  Warnings:

  - Added the required column `averageCost` to the `Cafe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cafe" ADD COLUMN     "averageCost" INTEGER NOT NULL;
