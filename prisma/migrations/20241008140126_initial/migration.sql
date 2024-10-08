-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('homme', 'femme');

-- CreateEnum
CREATE TYPE "DayOff" AS ENUM ('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('actif', 'inactif', 'en_vacances', 'licencie', 'retraite', 'en_attente', 'demissionne');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "shiftStart" TIME NOT NULL,
    "shiftEnd" TIME NOT NULL,
    "dayOff" "DayOff",
    "gender" "Gender" NOT NULL,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'en_attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_phone_idx" ON "Employee"("phone");
