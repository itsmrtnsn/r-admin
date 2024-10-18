'use server';
import prisma from '@/prisma/client';

const getAttendanceReport = async () => {
  const attendanceReport = await prisma.attendance.findMany({
    where: {
      employee: {
        status: 'actif',
      },
    },
    select: {
      employee: {
        select: {
          firstName: true,
          lastName: true,
          status: true,
          shiftEnd: true,
          shiftStart: true,
        },
      },
      attendanceStatus: true,
      checkInTime: true,
      checkOutTime: true,
      checkInStatus: true,
      checkOutStatus: true,
    },
  });
};

export default getAttendanceReport;
