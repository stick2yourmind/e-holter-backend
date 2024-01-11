/*
  Warnings:

  - Added the required column `date` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heartRate` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "heartRate" INTEGER NOT NULL;
