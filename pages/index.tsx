// pages/index.tsx
import { useEffect, useState } from 'react';
import { QueryFunctionContext, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Container, CircularProgress, Box, Grid } from '@mui/material';

import Header from '@/pages/components/Header';
import DateRangePickerComponent from '@/pages/components/DateRangePicker';
import RoomCategorySection from '@/pages/components/RoomCategorySection';

import { IRateCalendarResponse } from './types/types';
import { IRoomCategory } from './types/IRoomCategory';
import RoomCard from './components/RoomCard';


const fetchRateCalendar = async ({
  queryKey,
}: QueryFunctionContext<[string, { startDate: string; endDate: string }]>
): Promise<IRateCalendarResponse> => {
  const [, { startDate, endDate }] = queryKey;
  const { data } = await axios.get(
    'https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment',
    {
      params: { start_date: startDate, end_date: endDate },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return data;
};



const Home = () => {

const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

const { data, error, isLoading }: UseQueryResult<IRateCalendarResponse, Error> = useQuery(
  ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }],
  fetchRateCalendar,
  {
    enabled: !!dateRange[0] && !!dateRange[1],
  }
);

return (
  <Container>
    <Header />
    <DateRangePickerComponent onDateChange={setDateRange} />
    {isLoading && <CircularProgress className='items-center justify-center '/>}
    {error && <div>Error: {error.message}</div>}
    {data && (
      <>
        <Box sx={{ mt: 4 }}>
            {data.data.map((roomCategory: IRoomCategory) => (
              <RoomCategorySection key={roomCategory.id} roomCategory={roomCategory} dates={dateRange.map(date => date!)} />
            ))}
          </Box>
      </>
    )}
  </Container>
);
};

export default Home;