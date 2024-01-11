-- AlterTable
ALTER TABLE "Record" DROP COLUMN "maximumPressure",
DROP COLUMN "minimumPressure",
ADD COLUMN     "maximum_pressure" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "minimum_pressure" DECIMAL(5,2) NOT NULL;

