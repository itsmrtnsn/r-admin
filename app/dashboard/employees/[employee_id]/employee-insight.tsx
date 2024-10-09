'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  UserCheck,
  UserMinus,
  AlertTriangle,
  TrendingUp,
  BarChart,
  Mail,
  Phone,
  Briefcase,
  Sun,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from 'recharts';

const attendanceData = [
  { month: 'Jan', presentDays: 22, lateDays: 1, absentDays: 0 },
  { month: 'Feb', presentDays: 20, lateDays: 0, absentDays: 1 },
  { month: 'Mar', presentDays: 23, lateDays: 2, absentDays: 0 },
  { month: 'Apr', presentDays: 21, lateDays: 1, absentDays: 1 },
  { month: 'May', presentDays: 22, lateDays: 0, absentDays: 0 },
  { month: 'Jun', presentDays: 20, lateDays: 3, absentDays: 0 },
];

const timeTracking = [
  { day: 'Mon', hours: 8.5 },
  { day: 'Tue', hours: 9.0 },
  { day: 'Wed', hours: 8.0 },
  { day: 'Thu', hours: 8.5 },
  { day: 'Fri', hours: 7.5 },
];

// Mock employee data based on the provided schema
const employeeData = {
  id: 'EMP001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  position: 'Software Engineer',
  shiftStart: new Date('2023-01-01T09:00:00'),
  shiftEnd: new Date('2023-01-01T17:00:00'),
  dayOff: 'Sunday',
  gender: 'Male',
  status: 'Active',
  hireDate: new Date('2023-01-15'),
  department: 'Engineering',
};

export default function EmployeeAttendanceInsights() {
  return (
    <div className='container mx-auto p-4 space-y-6'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row items-start gap-6'>
            <Avatar className='w-24 h-24'>
              <AvatarImage
                src='/placeholder.svg?height=96&width=96'
                alt='Employee'
              />
              <AvatarFallback>{`${employeeData.firstName[0]}${employeeData.lastName[0]}`}</AvatarFallback>
            </Avatar>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold'>{`${employeeData.firstName} ${employeeData.lastName}`}</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <p className='text-muted-foreground flex items-center'>
                  <UserCheck className='mr-2 h-4 w-4' />
                  ID: {employeeData.id}
                </p>
                <p className='text-muted-foreground flex items-center'>
                  <Mail className='mr-2 h-4 w-4' />
                  {employeeData.email}
                </p>
                <p className='text-muted-foreground flex items-center'>
                  <Phone className='mr-2 h-4 w-4' />
                  {employeeData.phone}
                </p>
                <p className='text-muted-foreground flex items-center'>
                  <Briefcase className='mr-2 h-4 w-4' />
                  {employeeData.position}
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Badge variant='secondary' className='flex items-center'>
                  <Clock className='mr-1 h-3 w-3' />
                  {`${employeeData.shiftStart.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} - ${employeeData.shiftEnd.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </Badge>
                <Badge variant='secondary' className='flex items-center'>
                  <Sun className='mr-1 h-3 w-3' />
                  Day Off: {employeeData.dayOff}
                </Badge>
                <Badge variant='secondary' className='flex items-center'>
                  <Calendar className='mr-1 h-3 w-3' />
                  Hired: {employeeData.hireDate.toLocaleDateString()}
                </Badge>
                <Badge
                  variant={
                    employeeData.status === 'Active' ? 'success' : 'warning'
                  }
                >
                  {employeeData.status}
                </Badge>
              </div>
            </div>
            <Button className='ml-auto'>View Full Profile</Button>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Attendance Rate
            </CardTitle>
            <UserCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>98.5%</div>
            <Progress value={98.5} className='mt-2' />
            <p className='text-xs text-muted-foreground mt-2'>
              2.5% above department average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              On-Time Arrival
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>95%</div>
            <Progress value={95} className='mt-2' />
            <p className='text-xs text-muted-foreground mt-2'>
              1% improvement from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Absent Days</CardTitle>
            <UserMinus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2</div>
            <p className='text-xs text-muted-foreground'>Last 3 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Overtime Hours
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12.5</div>
            <p className='text-xs text-muted-foreground'>This month</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <RechartsBarChart data={attendanceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='presentDays' name='Present' fill='#4ade80' />
                <Bar dataKey='lateDays' name='Late' fill='#fbbf24' />
                <Bar dataKey='absentDays' name='Absent' fill='#f87171' />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Time Tracking</CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={timeTracking}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='hours' stroke='#8884d8' />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            {[
              {
                date: '2023-07-10',
                status: 'Present',
                timeIn: '08:55 AM',
                timeOut: '05:30 PM',
              },
              {
                date: '2023-07-09',
                status: 'Present',
                timeIn: '09:02 AM',
                timeOut: '05:45 PM',
              },
              {
                date: '2023-07-08',
                status: 'Late',
                timeIn: '09:15 AM',
                timeOut: '06:00 PM',
              },
              {
                date: '2023-07-07',
                status: 'Present',
                timeIn: '08:50 AM',
                timeOut: '05:20 PM',
              },
              {
                date: '2023-07-06',
                status: 'Present',
                timeIn: '08:58 AM',
                timeOut: '05:35 PM',
              },
            ].map((log, index) => (
              <li key={index} className='flex items-center justify-between'>
                <span>{log.date}</span>
                <Badge
                  variant={log.status === 'Present' ? 'default' : 'destructive'}
                >
                  {log.status}
                </Badge>
                <span>
                  {log.timeIn} - {log.timeOut}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            <li className='flex items-start'>
              <AlertTriangle className='mr-2 h-5 w-5 text-yellow-500' />
              <div>
                <p className='font-semibold'>
                  Frequent Late Arrivals on Mondays
                </p>
                <p className='text-sm text-muted-foreground'>
                  Consider adjusting Monday schedule or investigating reasons
                  for tardiness.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <BarChart className='mr-2 h-5 w-5 text-green-500' />
              <div>
                <p className='font-semibold'>
                  Consistent Early Departures on Fridays
                </p>
                <p className='text-sm text-muted-foreground'>
                  Employee tends to leave earlier on Fridays. May be worth
                  discussing work-life balance.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <TrendingUp className='mr-2 h-5 w-5 text-blue-500' />
              <div>
                <p className='font-semibold'>
                  Improved Punctuality in Last Month
                </p>
                <p className='text-sm text-muted-foreground'>
                  Notable improvement in on-time arrivals compared to previous
                  month.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Attendance Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold mb-2'>Leave Balance</h3>
              <ul className='space-y-2'>
                <li>Annual Leave: 15 days</li>
                <li>Sick Leave: 7 days</li>
                <li>Personal Leave: 3 days</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Attendance Streak</h3>
              <p>Current Streak: 15 days</p>
              <p>Longest Streak: 45 days</p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Time-off Requests</h3>
              <ul className='space-y-2'>
                <li>Upcoming: 2 days (July 20-21, 2023)</li>
                <li>Pending Approval: 1 day (August 15, 2023)</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Overtime Summary</h3>
              <p>This Month: 12.5 hours</p>
              <p>Last Month: 8 hours</p>
              <p>Year to Date: 45.5 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
