'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';

interface EmployeeBadgeProps {
  name: string;
  position: string;
  department: string;
  employeeId: string;
  avatarUrl: string;
  companyLogo: string;
}

const EmployeeBadge: React.FC<EmployeeBadgeProps> = ({
  name,
  position,
  department,
  employeeId,
  avatarUrl,
  companyLogo,
}) => {
  return (
    <Card className='w-64 h-96 m-4 flex flex-col overflow-hidden'>
      <div className='bg-primary h-24 flex items-center justify-center'>
        <Image
          src={companyLogo}
          alt='Company Logo'
          width={100}
          height={40}
          className='object-contain'
        />
      </div>
      <CardContent className='flex-1 flex flex-col items-center justify-between p-4'>
        <Avatar className='w-24 h-24 border-4 border-primary -mt-12'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className='text-center mt-4'>
          <h2 className='text-xl font-bold'>{name}</h2>
          <p className='text-sm text-muted-foreground'>{position}</p>
        </div>
        <Badge variant='secondary' className='mt-2'>
          {department}
        </Badge>
        <div className='text-sm text-muted-foreground mt-2'>
          Employee ID: {employeeId}
        </div>
        <div className='mt-4'>
          <QRCodeSVG
            value={`https://company.com/employee/${employeeId}`}
            size={80}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function EmployeeCards() {
  return (
    <div className='flex flex-wrap justify-center items-center min-h-screen bg-gray-50'>
      <EmployeeBadge
        name='John Doe'
        position='Senior Developer'
        department='Engineering'
        employeeId='EMP001'
        avatarUrl='/placeholder.svg'
        companyLogo='/placeholder.svg'
      />
      <EmployeeBadge
        name='Jane Smith'
        position='Product Manager'
        department='Product'
        employeeId='EMP002'
        avatarUrl='/placeholder.svg'
        companyLogo='/placeholder.svg'
      />
      <EmployeeBadge
        name='Mike Johnson'
        position='UX Designer'
        department='Design'
        employeeId='EMP003'
        avatarUrl='/placeholder.svg'
        companyLogo='/placeholder.svg'
      />
      <EmployeeBadge
        name='Jane Smith'
        position='Product Manager'
        department='Product'
        employeeId='EMP002'
        avatarUrl='/placeholder.svg'
        companyLogo='/placeholder.svg'
      />
    </div>
  );
}
