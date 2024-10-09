'use server';

import prisma from '@/prisma/client';

export async function getAttendance(
  employeeName?: string,
  specificDate?: Date,
  page: number = 1,
  itemsPerPage: number = 10
) {
  try {
    const today = new Date();
    const defaultDate = new Date(today.setHours(0, 0, 0, 0));

    // Use provided date or default to today
    const dateToFilter = specificDate
      ? new Date(specificDate.setHours(0, 0, 0, 0))
      : defaultDate;

    // Fetch attendance data for employees with status 'actif'
    // Step 1: Fetch all active employees
    const activeEmployees = await prisma.employee.findMany({
      where: {
        status: 'actif', // Fetch employees with status 'actif'
        ...(employeeName && {
          OR: [
            { firstName: { contains: employeeName, mode: 'insensitive' } },
            { lastName: { contains: employeeName, mode: 'insensitive' } },
          ],
        }),
      },
      select: {
        firstName: true,
        lastName: true,
        shiftStart: true,
        shiftEnd: true,
        status: true,
      },
    });

    // Step 2: Fetch attendance records for the specific date with pagination
    const [attendanceRecords, totalRecords] = await Promise.all([
      prisma.attendance.findMany({
        where: {
          date: {
            equals: dateToFilter,
          },
          ...(employeeName && {
            employee: {
              OR: [
                { firstName: { contains: employeeName, mode: 'insensitive' } },
                { lastName: { contains: employeeName, mode: 'insensitive' } },
              ],
            },
          }),
        },
        include: {
          employee: {
            select: {
              firstName: true,
              lastName: true,
              shiftStart: true,
              shiftEnd: true,
              status: true,
            },
          },
        },
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      prisma.attendance.count({
        where: {
          date: {
            equals: dateToFilter,
          },
          ...(employeeName && {
            employee: {
              OR: [
                { firstName: { contains: employeeName, mode: 'insensitive' } },
                { lastName: { contains: employeeName, mode: 'insensitive' } },
              ],
            },
          }),
        },
      }),
    ]);

    // Step 3: Calculate attendance statistics
    const totalActiveEmployees = activeEmployees.length; // Count of active employees

    // Filter attendance records for different statistics
    const presentToday = attendanceRecords.filter(
      (record) => record.attendanceStatus === 'present'
    ).length;

    const checkInOnTime = attendanceRecords.filter(
      (record) => record.checkInStatus === 'on_time'
    ).length;

    const checkInLate = attendanceRecords.filter(
      (record) => record.checkInStatus === 'late'
    ).length;

    // Step 4: Return the attendance summary with pagination info
    return {
      data: {
        totalActiveEmployees, // Total active employees, regardless of attendance
        presentToday,
        checkInOnTime,
        checkInLate,
        attendanceRecords, // Still return attendance records
        totalRecords, // Total number of records for pagination
        currentPage: page, // Current page number
        totalPages: Math.ceil(totalRecords / itemsPerPage), // Total pages
      },
      success: true,
      message: 'Attendance fetched successfully',
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error fetching attendance' };
  }
}
