/*
  Warnings:

  - The values [STABLE] on the enum `MarketOutlook` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `nedxtUpdate` on the `IndustryInsights` table. All the data in the column will be lost.
  - Added the required column `nextUpdate` to the `IndustryInsights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MarketOutlook_new" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');
ALTER TABLE "IndustryInsights" ALTER COLUMN "marketOutlook" TYPE "MarketOutlook_new" USING ("marketOutlook"::text::"MarketOutlook_new");
ALTER TYPE "MarketOutlook" RENAME TO "MarketOutlook_old";
ALTER TYPE "MarketOutlook_new" RENAME TO "MarketOutlook";
DROP TYPE "MarketOutlook_old";
COMMIT;

-- AlterTable
ALTER TABLE "IndustryInsights" DROP COLUMN "nedxtUpdate",
ADD COLUMN     "nextUpdate" TIMESTAMP(3) NOT NULL;
