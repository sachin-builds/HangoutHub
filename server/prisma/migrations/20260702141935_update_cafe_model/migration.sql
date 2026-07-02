/*
  Warnings:

  - The values [BUDGET] on the enum `PriceRange` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `city` to the `Cafe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PriceRange_new" AS ENUM ('LOW', 'MID', 'PREMIUM');
ALTER TABLE "Cafe" ALTER COLUMN "priceRange" TYPE "PriceRange_new" USING ("priceRange"::text::"PriceRange_new");
ALTER TYPE "PriceRange" RENAME TO "PriceRange_old";
ALTER TYPE "PriceRange_new" RENAME TO "PriceRange";
DROP TYPE "public"."PriceRange_old";
COMMIT;

-- AlterTable
ALTER TABLE "Cafe" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "closingTime" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "noiseLevel" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "openingTime" TEXT,
ADD COLUMN     "powerSockets" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "wifi" BOOLEAN NOT NULL DEFAULT true;
