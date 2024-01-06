-- DropForeignKey
ALTER TABLE "_RecordToTag" DROP CONSTRAINT "_RecordToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecordToTag" DROP CONSTRAINT "_RecordToTag_B_fkey";

-- DropTable
DROP TABLE "_RecordToTag";

