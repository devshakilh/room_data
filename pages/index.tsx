// pages/index.tsx
import { useEffect, useState } from 'react';
import { QueryFunctionContext, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Container, CircularProgress, Box, Grid } from '@mui/material';

import Header from '@/pages/components/Header';
import DateRangePickerComponent from '@/pages/components/DateRangePicker';
import RoomCategorySection from '@/pages/components/RoomCategorySection';
import RatePlan from '@/pages/components/RatePlan';
import { IRateCalendarResponse } from './types/types';
import { IRoomCategory } from './types/IRoomCategory';
import RoomCard from './components/RoomCard';


// const fetchRateCalendar = async ({
//   queryKey,
// }: QueryFunctionContext<[string, { startDate: string; endDate: string }]>
// ): Promise<IRateCalendarResponse> => {
//   const [, { startDate, endDate }] = queryKey;
//   const { data } = await axios.get(
//     `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment`,
//     {
//       params: { start_date: startDate, end_date: endDate },
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     }
//   );
//   return data;
// };

// const Home = () => {
//   const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

//   const { data, error, isLoading }: UseQueryResult<IRateCalendarResponse, Error> = useQuery(
//     ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }],
//     fetchRateCalendar,
//     {
//       enabled: !!dateRange[0] && !!dateRange[1],
//     }
//   );

//   return (
//     <Container>
//       <Header />
//       <DateRangePickerComponent onDateChange={setDateRange} />
//       {isLoading && <CircularProgress />}
//       {error && <div>Error: {error.message}</div>}
//       {data && (
//         <Box sx={{ overflowX: 'auto' }}>
//           {data.data.map((roomCategory: IRoomCategory) => (
//             <Box key={roomCategory.id} sx={{ mb: 4 }}>
//               <RoomCategorySection roomCategory={roomCategory} />
//               <RatePlan ratePlans={roomCategory.rate_plans} occupancy={roomCategory.occupancy} />
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Home;

// const fetchRateCalendar = async ({
//   queryKey,
// }: QueryFunctionContext<[string, { startDate: string; endDate: string }]>
// ): Promise<IRateCalendarResponse> => {
//   const [, { startDate, endDate }] = queryKey;
//   const { data } = await axios.get(
//     'https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment',
//     {
//       params: { start_date: startDate, end_date: endDate },
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     }
//   );
//   return data;
// };

// const Home = () => {
//   const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
//   const [selectedRoom, setSelectedRoom] = useState<IRoomCategory | null>(null);

//   const { data, error, isLoading }: UseQueryResult<IRateCalendarResponse, Error> = useQuery(
//     ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }],
//     fetchRateCalendar,
//     {
//       enabled: !!dateRange[0] && !!dateRange[1],
//     }
//   );

//   return (
//     <div>
//       <Header />
//       <DateRangePickerComponent onDateChange={setDateRange} />
//       {isLoading && <CircularProgress />}
//       {error && <div>Error: {error.message}</div>}
//       {data && (
//         <>
//           <Grid container spacing={2}>
//             {data.data.map((roomCategory: IRoomCategory) => (
//               <Grid item xs={12} md={4} key={roomCategory.id}>
//                 <RoomCard
//                   roomCategory={roomCategory}
//                   onSelect={() => setSelectedRoom(roomCategory)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           {selectedRoom && (
//             <Box sx={{ overflowX: 'auto', mt: 4 }}>
//               <RoomCategorySection roomCategory={selectedRoom} />
//             </Box>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;


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
  const [selectedRoom, setSelectedRoom] = useState<IRoomCategory | null>(null);

  const { data, error, isLoading }: UseQueryResult<IRateCalendarResponse, Error> = useQuery(
    ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }],
    fetchRateCalendar,
    {
      enabled: !!dateRange[0] && !!dateRange[1],
    }
  );

  // Use effect to automatically select the first room when data changes
  useEffect(() => {
    if (data && data.data.length > 0) {
      setSelectedRoom(data.data[0]);
    }
  }, [data]);

  return (
    <Container>
      <Header />
      <DateRangePickerComponent onDateChange={setDateRange} />
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <>
          <Grid container spacing={2}>
            {data.data.map((roomCategory: IRoomCategory) => (
              <Grid item xs={12} md={4} key={roomCategory.id}>
                <RoomCard
                  roomCategory={roomCategory}
                  onSelect={() => setSelectedRoom(roomCategory)}
                />
              </Grid>
            ))}
          </Grid>
          {selectedRoom && (
            <Box sx={{ overflowX: 'auto', mt: 4 }}>
              <RoomCategorySection roomCategory={selectedRoom} />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;