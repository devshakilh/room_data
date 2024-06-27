// // components/RatePlan.tsx
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { IRatePlan } from '../types/types';

// interface RatePlanProps {
//   ratePlans: IRatePlan[];
//   occupancy: number;
// }

// const RatePlan = ({ ratePlans, occupancy }: RatePlanProps) => (
//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Rate Plan Name</TableCell>
//           <TableCell>Occupancy</TableCell>
//           <TableCell>Rate</TableCell>
//           <TableCell>Minimum Length of Stay</TableCell>
//           <TableCell>Reservation Deadline</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {ratePlans.map((ratePlan) =>
//           ratePlan.calendar.map((rate) => (
//             <TableRow key={rate.id}>
//               <TableCell>{ratePlan.name}</TableCell>
//               <TableCell>{occupancy}</TableCell>
//               <TableCell>{rate.rate}</TableCell>
//               <TableCell>{rate.min_length_of_stay}</TableCell>
//               <TableCell>{rate.reservation_deadline}</TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// export default RatePlan;
