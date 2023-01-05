-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "expectedEndDate" DATETIME,
    "utilizationRate" DECIMAL,
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
INSERT INTO "new_ProjectHistory" ("contractType", "cost", "createdAt", "endDate", "engineerId", "expectedEndDate", "id", "projectId", "purchaseContractCompany", "sales", "salesContractCompany", "startDate", "updateAt", "utilizationRate") SELECT "contractType", "cost", "createdAt", "endDate", "engineerId", "expectedEndDate", "id", "projectId", "purchaseContractCompany", "sales", "salesContractCompany", "startDate", "updateAt", "utilizationRate" FROM "ProjectHistory";
DROP TABLE "ProjectHistory";
ALTER TABLE "new_ProjectHistory" RENAME TO "ProjectHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
