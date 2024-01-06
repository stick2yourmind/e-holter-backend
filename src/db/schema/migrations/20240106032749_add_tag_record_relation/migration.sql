-- CreateTable
CREATE TABLE "_RecordToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecordToTag_AB_unique" ON "_RecordToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RecordToTag_B_index" ON "_RecordToTag"("B");

-- AddForeignKey
ALTER TABLE "_RecordToTag" ADD CONSTRAINT "_RecordToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordToTag" ADD CONSTRAINT "_RecordToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
