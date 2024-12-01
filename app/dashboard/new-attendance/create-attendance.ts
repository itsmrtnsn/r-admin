'use server';

import prisma from '@/prisma/client';
import createAttendanceSchema from '../_schema/attendance-form-schema';
import CreateAttendanceFormData from '../_types/create-attendance-form-data';
import { format, startOfDay } from 'date-fns';

const createAttendance = async (data: CreateAttendanceFormData) => {
  const result = createAttendanceSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors[0].message,
    };
  }

  const now = new Date();
  const todayDate = startOfDay(now); // Keep as Date object at start of day
  const currentTime = format(now, 'HH:mm'); // Extract current time only

  try {
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: result.data.employeeId },
    });

    if (!existingEmployee) {
      return {
        success: false,
        message: `L'identifiant d'employé fourni n'est pas valide`,
      };
    }

    const shiftStartTime = format(
      new Date(existingEmployee.shiftStart),
      'HH:mm'
    );
    const shiftEndTime = format(new Date(existingEmployee.shiftEnd), 'HH:mm');

    const checkedInStatus = currentTime > shiftStartTime ? 'late' : 'on_time';
    const checkOutStatus = currentTime >= shiftEndTime ? 'on_time' : 'early';

    const isCheckedIn = await prisma.attendance.findFirst({
      where: {
        employeeId: result.data.employeeId,
        // date:{lte: }
      },
    });

    if (!isCheckedIn) {
      const checkIn = await prisma.attendance.create({
        data: {
          employeeId: result.data.employeeId,
          date: todayDate,
          checkInTime: currentTime,
          checkInStatus: checkedInStatus,
        },
      });

      return { success: true, message: 'Check-in successful', data: checkIn };
    }

    if (!isCheckedIn.checkOutTime) {
      const checkOut = await prisma.attendance.update({
        where: { id: isCheckedIn.id },
        data: {
          checkOutTime: currentTime,
          checkOutStatus: checkOutStatus,
        },
      });

      return {
        success: true,
        message: 'Check-out successful',
        data: checkOut,
      };
    }

    return {
      success: false,
      message: 'You have already checked out',
    };
  } catch (error) {
    console.error('Error creating attendance:', error);
    return {
      success: false,
      message: 'Attendance cannot be created',
    };
  }
};

export default createAttendance;
