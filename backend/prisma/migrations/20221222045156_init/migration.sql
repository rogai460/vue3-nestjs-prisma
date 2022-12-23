/*
  Warnings:

  - You are about to alter the column `endDate` on the `ProjectHistory` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `startDate` on the `ProjectHistory` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
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
