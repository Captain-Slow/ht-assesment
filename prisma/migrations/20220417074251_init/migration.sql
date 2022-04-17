-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "jobTitle" TEXT,
    "company" TEXT,
    "bio" TEXT,
    "phoneNumber" TEXT,
    "userId" TEXT,
    "countryId" TEXT,
    "vernacularId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Profile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Profile_vernacularId_fkey" FOREIGN KEY ("vernacularId") REFERENCES "Vernacular" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardHolderName" TEXT,
    "cardNumber" TEXT,
    "cardExpiryDate" DATETIME,
    "cardCvv" TEXT,
    "zipCode" TEXT,
    "countryId" TEXT,
    "userId" TEXT,
    CONSTRAINT "PaymentDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentDetail_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlanType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rate" REAL,
    "compoundingPeriod" TEXT
);

-- CreateTable
CREATE TABLE "UserSubscriptionPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "planTypeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSubscriptionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSubscriptionPlan_planTypeId_fkey" FOREIGN KEY ("planTypeId") REFERENCES "PlanType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NotificationSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationAlert" BOOLEAN NOT NULL DEFAULT false,
    "securityAlert" BOOLEAN NOT NULL DEFAULT false,
    "meetupAlert" BOOLEAN NOT NULL DEFAULT false,
    "itemCommentAlert" BOOLEAN NOT NULL DEFAULT false,
    "mentionAlert" BOOLEAN NOT NULL DEFAULT false,
    "followAlert" BOOLEAN NOT NULL DEFAULT false,
    "repliesAlert" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NotificationSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vernacular" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetail_userId_key" ON "PaymentDetail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionPlan_userId_key" ON "UserSubscriptionPlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_userId_key" ON "NotificationSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_title_key" ON "Country"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Vernacular_title_key" ON "Vernacular"("title");
