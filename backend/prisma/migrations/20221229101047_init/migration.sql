/*
  Warnings:

  - Added the required column `utilizationRate` to the `ProjectHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Engineer" ADD COLUMN "affiliatedCompany" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "expectedEndDate" DATETIME,
    "utilizationRate" DECIMAL NOT NULL,
    "salesContractCompany" TEXT,
    "purchaseContractCompany" TEXT,
    "contractType" INTEGER,
    "sales" INTEGER NOT NULL,
    "cost" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    "engineerId" INTEGER NOT NULL,
    CONSTRAINT "ProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectHistory_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectHistory" ("cost", "createdAt", "endDate", "engineerId", "id", "projectId", "sales", "startDate", "updateAt") SELECT "cost", "createdAt", "endDate", "engineerId", "id", "projectId", "sales", "startDate", "updateAt" FROM "ProjectHistory";
DROP TABLE "ProjectHistory";
ALTER TABLE "new_ProjectHistory" RENAME TO "ProjectHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
