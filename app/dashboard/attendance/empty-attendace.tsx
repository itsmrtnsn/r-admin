const EmptyAttendance = () => {
  return (
    <div className='border-[0.1px] h-[57vh] rounded-lg p-4 flex items-center justify-center bg-[#0a0a0a]'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-2xl font-bold'>Aucune donnée de présence</div>
        <div className='text-sm text-muted-foreground'>
          Aucune donnée de présence pour ce jour
        </div>
      </div>
    </div>
  );
};

export default EmptyAttendance;
