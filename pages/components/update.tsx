// const getMonthYearLabels = (dates: string[]) => {
//     const monthYearLabels: { label: string; span: number }[] = [];
//     let currentMonth = getMonth(parseISO(dates[0]));
//     let currentYear = getYear(parseISO(dates[0]));
//     let span = 0;

//     dates.forEach((date) => {
//       const month = getMonth(parseISO(date));
//       const year = getYear(parseISO(date));
//       if (month === currentMonth && year === currentYear) {
//         span += 1;
//       } else {
//         monthYearLabels.push({ label: format(parseISO(dates[span - 1]), 'MMMM yyyy'), span });
//         currentMonth = month;
//         currentYear = year;
//         span = 1;
//       }
//     });
//     monthYearLabels.push({ label: format(parseISO(dates[span - 1]), 'MMMM yyyy'), span });

//     return monthYearLabels;
//   };

//   const monthYearLabels = getMonthYearLabels(dates);
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//       <TableHead>
//           <TableRow>
//             <TableCell></TableCell>
//             {monthYearLabels.map((monthYear, index) => (
//               <TableCell key={index} colSpan={monthYear.span} align="center">
//                 {monthYear.label}
//               </TableCell>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableCell></TableCell>
//             {dates.map((date, index) => (
//               <TableCell key={index} align="center">
//                 {format(parseISO(date), 'EEE')}<br/>
//                 {format(parseISO(date), 'dd')}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         <TableRow>
//             <TableCell colSpan={dates.length + 1} style={{ fontWeight: 'bold',  }} className='text-xl font-bold'>
//               {roomCategory.name}
//             </TableCell>
//           </TableRow>
        
//           <TableRow>
//             <TableCell>Status</TableCell>
//             {roomCategory.inventory_calendar.map((inventory) => (
//               <StyledTableCell key={inventory.id} status={inventory.status}>
//                 {inventory.status ? 'Sellable' : 'Close'}
//               </StyledTableCell>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableCell>Rooms to Sell</TableCell>
//             {roomCategory.inventory_calendar.map((inventory) => (
//               <TableCell key={inventory.id}>{inventory.available}</TableCell>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableCell>Net booked</TableCell>
//             {roomCategory.inventory_calendar.map((inventory) => (
//               <TableCell key={inventory.id}>{inventory.booked}</TableCell>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableCell >Standard Rate
//             <TableCell colSpan={dates.length} className='text-blue-500'><PersonIcon /> <span className='px-1'>x</span>{roomCategory.occupancy}</TableCell>
//             </TableCell>
//             {dates.map((date, index) => {
//               const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
//               const rateForDate = ratePlan.calendar.find(
//                 (calendarEntry) => calendarEntry.date === date
//               );
//               return (
//                 <TableCell key={index}>
//                   {rateForDate ? rateForDate.rate : 'N/A'}
//                 </TableCell>
//               );
//             })}
//           </TableRow>
//           <TableRow>
//             <TableCell>Min Length of Stay</TableCell>
//             {dates.map((date, index) => {
//               const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
//               const rateForDate = ratePlan.calendar.find(
//                 (calendarEntry) => calendarEntry.date === date
//               );
//               return (
//                 <TableCell key={index}>
//                   {rateForDate ? rateForDate.min_length_of_stay : 'N/A'}
//                 </TableCell>
//               );
//             })}
//           </TableRow>
//           <TableRow>
//             <TableCell>Reservation Deadline</TableCell>
//             {dates.map((date, index) => {
//               const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
//               const rateForDate = ratePlan.calendar.find(
//                 (calendarEntry) => calendarEntry.date === date
//               );
//               return (
//                 <TableCell key={index}>
//                   {rateForDate && rateForDate.reservation_deadline 
//                     ? format(parseISO(rateForDate.reservation_deadline), 'MM/dd/yyyy (EEE)') 
//                     : 'N/A'}
//                 </TableCell>
//               );
//             })}
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };





//   const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
//   const [selectedRoom, setSelectedRoom] = useState<IRoomCategory | null>(null);

//   const { data, error, isLoading }: UseQueryResult<IRateCalendarResponse, Error> = useQuery(
//     ['rateCalendar', { startDate: dateRange[0]!, endDate: dateRange[1]! }],
//     fetchRateCalendar,
//     {
//       enabled: !!dateRange[0] && !!dateRange[1],
//     }
//   );




//   // Use effect to automatically select the first room when data changes
//   useEffect(() => {
//     if (data && data.data.length > 0) {
//       setSelectedRoom(data.data[0]);
//     }
//   }, [data]);




//   return (
//     <Container>
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
//     </Container>
//   );
// };

// export default Home;




// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { format, parseISO, getMonth, getYear } from 'date-fns';
// import { IRoomCategory } from '../types/IRoomCategory';
// import PersonIcon from '@mui/icons-material/Person';




// interface RoomCategoryTableProps {
//   roomCategories: IRoomCategory[];
// }

// const RoomCategoryTable: React.FC<RoomCategoryTableProps> = ({ roomCategories }) => {
//   const dates = roomCategories.length > 0 ? roomCategories[0].inventory_calendar.map(inventory => inventory.date) : [];

//   const getMonthYearLabels = (dates: string[]) => {
//     const monthYearLabels: { label: string; span: number }[] = [];
//     let currentMonth = getMonth(parseISO(dates[0]));
//     let currentYear = getYear(parseISO(dates[0]));
//     let span = 0;

//     dates.forEach(date => {
//       const month = getMonth(parseISO(date));
//       const year = getYear(parseISO(date));
//       if (month === currentMonth && year === currentYear) {
//         span += 1;
//       } else {
//         monthYearLabels.push({ label: `${format(parseISO(dates[span]), 'MMMM yyyy')}`, span });
//         currentMonth = month;
//         currentYear = year;
//         span = 1;
//       }
//     });
//     monthYearLabels.push({ label: `${format(parseISO(dates[span]), 'MMMM yyyy')}`, span });

//     return monthYearLabels;
//   };

//   const monthYearLabels = getMonthYearLabels(dates);

//   return (
//     <TableContainer component={Paper} className='bg-white rounded-2xl m-10'>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell></TableCell>
//             {dates.map((date, index) => (
//               <React.Fragment key={index}>
//                 {index === 0 || !monthYearLabels[index] || monthYearLabels[index].label !== monthYearLabels[index - 1].label ? (
//                   <TableCell  colSpan={monthYearLabels[index]?.span}>
//                     {monthYearLabels[index]?.label}
//                   </TableCell>
//                 ) : null}
//               </React.Fragment>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableCell></TableCell>
//             {dates.map((date, index) => (
//               <TableCell key={index} >
//                 {format(parseISO(date), 'EEE')}<br />
//                 {format(parseISO(date), 'dd')}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {roomCategories.map((roomCategory, rcIndex) => (
//             <React.Fragment key={rcIndex}>
//               <TableRow>
//                 <TableCell colSpan={dates.length + 1} className='min-w-66 text-xl font-bold'>
//                   {roomCategory.name}
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Status</TableCell>
//                 {dates.map((date, index) => {
//                   const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                   return (
//                     <TableCell
//                       key={index}
//                       style={{
//                         backgroundColor: inventory && !inventory.status ? 'red' : 'green',
//                         color: 'white',
//                       }}
//                     >
//                       {inventory ? (inventory.status ? 'Sellable' : 'Close') : 'N/A'}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//               <TableRow>
//                 <TableCell>Rooms to Sell</TableCell>
//                 {dates.map((date, index) => {
//                   const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                   return (
//                     <TableCell
//                       key={index}
//                       style={{
//                         backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
//                         color: inventory && !inventory.status ? 'white' : 'black',
//                       }}
//                     >
//                       {inventory ? inventory.available : 'N/A'}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//               <TableRow>
//                 <TableCell>Net Booked</TableCell>
//                 {dates.map((date, index) => {
//                   const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                   return (
//                     <TableCell
//                       key={index}
//                       style={{
//                         backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
//                         color: inventory && !inventory.status ? 'white' : 'black',
//                       }}
//                     >
//                       {inventory ? inventory.booked : 'N/A'}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//               {roomCategory.rate_plans.map((ratePlan, rpIndex) => (
//                 <React.Fragment key={rpIndex}>
//                   <TableRow>
//                     <TableCell className='min-w-56'>{ratePlan.name}
//                     <TableCell colSpan={dates.length} className='text-blue-500'><PersonIcon /> <span className='px-1'>x</span>{roomCategory.occupancy}</TableCell>
//                     </TableCell>
//                     {dates.map((date, index) => {
//                       const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       return (
//                         <TableCell
//                           key={index}
//                           style={{
//                             backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
//                             color: inventory && !inventory.status ? 'white' : 'black',
//                             fontWeight: '500',
//                           }}
//                         >
//                           {rateForDate ? rateForDate.rate : 'N/A'}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Min Length of Stay</TableCell>
//                     {dates.map((date, index) => {
//                       const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       return (
//                         <TableCell
//                           key={index}
//                           style={{
//                             backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
//                           }}
//                         >
//                           {rateForDate ? rateForDate.min_length_of_stay ?? 'N/A' : 'N/A'}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Reservation Deadline</TableCell>
//                     {dates.map((date, index) => {
//                       const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
//                       return (
//                         <TableCell
//                           key={index}
//                           style={{
//                             backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
//                           }}
//                         >
//                           {rateForDate ? rateForDate.reservation_deadline ?? 'N/A' : 'N/A'}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 </React.Fragment>
//               ))}
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default RoomCategoryTable;