-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Engineer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastNameKana" TEXT,
    "firstNameKana" TEXT,
    "sex" INTEGER,
    "employeeId" INTEGER,
    "employeeCategory" INTEGER,
    "laborCost" INTEGER,
    "company" TEXT,
    "affiliatedCompany" TEXT
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectNameMask" TEXT,
    "projectName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endUser" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectHistory" (
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
