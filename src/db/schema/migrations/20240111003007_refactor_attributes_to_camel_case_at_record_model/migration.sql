/*
  Warnings:

  - You are about to drop the column `maximum_pressure` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `minimum_pressure` on the `Record` table. All the data in the column will be lost.
  - Added the required column `maximumPressure` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumPressure` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "maximum_pressure",
DROP COLUMN "minimum_pressure",
ADD COLUMN     "maximumPressure" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "minimumPressure" DECIMAL(5,2) NOT NULL;
