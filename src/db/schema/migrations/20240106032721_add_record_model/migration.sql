-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "minimum_pressure" VARCHAR NOT NULL,
    "maximum_pressure" VARCHAR NOT NULL,
    "observations" VARCHAR,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_userId_key" ON "Record"("userId");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
