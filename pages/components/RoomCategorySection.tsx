// // components/RoomCategorySection.tsx
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { IRoomCategory } from '../types/types';

// interface RoomCategorySectionProps {
//   roomCategory: IRoomCategory;
// }

// const RoomCategorySection = ({ roomCategory }: RoomCategorySectionProps) => (
//   <TableContainer component={Paper} >
//     <Table >
//       <TableHead>
//         <TableRow>
//           <TableCell>Room Name</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Rooms to Sell</TableCell>
//           <TableCell>Net Booked</TableCell>
//           <TableCell>occupancy</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {roomCategory.inventory_calendar.map((inventory) => (
//         <div key={inventory.id}>
//             {/* <p>{roomCategory.name}</p> */}
//           <TableRow className=''>
//             <TableCell>{roomCategory.name}</TableCell>
//             <TableCell>{inventory.status ? 'Sellable' : 'Not Sellable'}</TableCell>
//             <TableCell>{inventory.available}</TableCell>
//             <TableCell>{inventory.booked}</TableCell>
//             <TableCell>{roomCategory.occupancy}</TableCell>
//           </TableRow>
//         </div>
//         ))}
//       </TableBody>

      
//     </Table>
//   </TableContainer>


// );

// export default RoomCategorySection;







import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { format, parseISO } from 'date-fns';
import { styled } from '@mui/system';
import { IRoomCategory } from '../types/IRoomCategory';

interface RoomCategorySectionProps {
  roomCategory: IRoomCategory;
}

const StyledTableCell = styled(TableCell)(({ theme, status }) => ({
  backgroundColor: status ? 'green' : 'red',
  color: 'white',
}));

const RoomCategorySection = ({ roomCategory }: RoomCategorySectionProps) => {
  const dates = roomCategory.inventory_calendar.map((inventory) => inventory.date);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {dates.map((date, index) => (
              <TableCell key={index}>{format(parseISO(date), 'MM/dd/yyyy (EEE)')}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell colSpan={dates.length + 1} style={{ fontWeight: 'bold',  }} className='text-xl font-bold'>
              {roomCategory.name}
            </TableCell>
          </TableRow>
        
          <TableRow>
            <TableCell>Status</TableCell>
            {roomCategory.inventory_calendar.map((inventory) => (
              <StyledTableCell key={inventory.id} status={inventory.status}>
                {inventory.status ? 'Sellable' : 'Close'}
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Rooms to Sell</TableCell>
            {roomCategory.inventory_calendar.map((inventory) => (
              <TableCell key={inventory.id}>{inventory.available}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Net booked</TableCell>
            {roomCategory.inventory_calendar.map((inventory) => (
              <TableCell key={inventory.id}>{inventory.booked}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell >Standard Rate
            <TableCell colSpan={dates.length}><GroupIcon /> x{roomCategory.occupancy}</TableCell>
            </TableCell>
            {dates.map((date, index) => {
              const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
              const rateForDate = ratePlan.calendar.find(
                (calendarEntry) => calendarEntry.date === date
              );
              return (
                <TableCell key={index}>
                  {rateForDate ? rateForDate.rate : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>Min Length of Stay</TableCell>
            {dates.map((date, index) => {
              const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
              const rateForDate = ratePlan.calendar.find(
                (calendarEntry) => calendarEntry.date === date
              );
              return (
                <TableCell key={index}>
                  {rateForDate ? rateForDate.min_length_of_stay : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>Reservation Deadline</TableCell>
            {dates.map((date, index) => {
              const ratePlan = roomCategory.rate_plans[0]; // Assuming first rate plan
              const rateForDate = ratePlan.calendar.find(
                (calendarEntry) => calendarEntry.date === date
              );
              return (
                <TableCell key={index}>
                  {rateForDate && rateForDate.reservation_deadline 
                    ? format(parseISO(rateForDate.reservation_deadline), 'MM/dd/yyyy (EEE)') 
                    : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomCategorySection;
