// // components/RoomList.tsx

// import React from 'react';

// interface Room {
//   id: string;
//   name: string;
//   inventory_calendar: {
//     date: string;
//     available: number;
//     status: boolean;
//     booked: number;
//   }[];
//   rate_plans: {
//     rate: number;
//   }[];
// }

// interface RoomListProps {
//   rooms: Room[];
// }

// const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {rooms.map((room) => (
//         <div key={room.id} className="p-4 rounded-md shadow-md">
//           <h2 className="text-lg font-semibold mb-2">{room.name}</h2>
//           <div className="mb-2">
//             {room.inventory_calendar.map((day) => (
//               <div
//                 key={day.date}
//                 className={`inline-block px-2 py-1 mr-2 mb-2 rounded ${
//                   day.status ? 'bg-green-200' : 'bg-red-200'
//                 }`}
//               >
//                 {day.date.slice(0, 10)} {/* Display only the date part */}
//               </div>
//             ))}
//           </div>
//           <p className="mb-1">Rooms to Sell: {room.inventory_calendar[0].available}</p>
//           <p className="mb-1">Net Booked: {room.inventory_calendar[0].booked}</p>
//           <p>Standard Rate: ${room.rate_plans[0].rate}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoomList;
