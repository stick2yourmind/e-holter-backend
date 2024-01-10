/*
  Warnings:

  - Changed the type of `minimum_pressure` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maximum_pressure` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "minimum_pressure",
ADD COLUMN     "minimum_pressure" DECIMAL(5,2) NOT NULL,
DROP COLUMN "maximum_pressure",
ADD COLUMN     "maximum_pressure" DECIMAL(5,2) NOT NULL;
