import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CircularProgress, Container } from '@mui/material';
import Header from '@/pages/components/Header';
import DateRangePickerComponent from '@/pages/components/DateRangePicker';
import { IRoomCategory } from './types/IRoomCategory';
import RoomCategoryTable from './components/RoomCategoryTable';

const fetchRateCalendar = async ({ queryKey }: { queryKey: [string, { startDate: string; endDate: string }] }) => {
  const [, { startDate, endDate }] = queryKey;
  const { data } = await axios.get('https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment', {
    params: { start_date: startDate, end_date: endDate },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return data;
};

const Home = () => {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

  const { data, error, isLoading } = useQuery('rateCalendar', () => fetchRateCalendar({ queryKey: ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }] }), {
    enabled: !!dateRange[0] && !!dateRange[1],
  });

  if (isLoading) return <CircularProgress className='items-center justify-center text' />;
  if (error) return <div>Error: {error.message}</div>;

  const roomCategories: IRoomCategory[] = data ? data.data : [];

  return (
    <div className=' m-'>
      
      <DateRangePickerComponent onDateChange={setDateRange} />
      {data && <RoomCategoryTable roomCategories={roomCategories} />}
    </div>
  );
};

export default Home;
