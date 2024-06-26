// // components/RoomAvailabilityGrid.tsx

// import React from 'react';

// interface Room {
//   id: string;
//   name: string;
//   inventory_calendar: {
//     id: string;
//     date: string;
//     status: boolean;
//   }[];
// }

// interface RoomAvailabilityGridProps {
//   rooms: Room[];
// }

// const RoomAvailabilityGrid: React.FC<RoomAvailabilityGridProps> = ({ rooms }) => {
//   // Assuming all rooms have the same date range, we can pick the dates from the first room
//   const dateRange = rooms.length > 0 ? rooms[0].inventory_calendar.map(day => day.date.slice(0, 10)) : [];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {rooms.map((room) => (
//         <div key={room.id} className="p-4 rounded-md shadow-md">
//           <h2 className="text-lg font-semibold mb-2">{room.name}</h2>
//           <div className="grid grid-cols-7 gap-1">
//             <div className="col-span-1 font-semibold">Date</div>
//             {dateRange.map(date => (
//               <div key={date} className="col-span-1 text-center">
//                 <div className={`p-2 rounded ${room.inventory_calendar.find(day => day.date.slice(0, 10) === date)?.status ? 'bg-green-200' : 'bg-red-200'}`}>
//                   {room.inventory_calendar.find(day => day.date.slice(0, 10) === date)?.status ? 'Available' : 'Not Available'}
//                 </div>
//                 <div className="font-semibold">{date}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoomAvailabilityGrid;
