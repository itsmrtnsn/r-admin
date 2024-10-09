-- CreateEnum
CREATE TYPE "AttendanceCheckInStatus" AS ENUM ('on_time', 'late');

-- CreateEnum
CREATE TYPE "AttendanceCheckOutStatus" AS ENUM ('early', 'on_time');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent', 'day_off', 'on_vacation', 'remote_work', 'sick_leave');

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "attendanceStatus" "AttendanceStatus" NOT NULL DEFAULT 'present',
    "employeeId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "checkInStatus" "AttendanceCheckInStatus",
    "checkInTime" TIME,
    "checkOutStatus" "AttendanceCheckOutStatus",
    "checkOutTime" TIME,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
