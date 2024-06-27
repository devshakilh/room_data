
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { format, parseISO, getMonth, getYear } from 'date-fns';

import { styled } from '@mui/system';
import { IRoomCategory } from '../types/IRoomCategory';

interface RoomCategorySectionProps {
  roomCategory: IRoomCategory;
}

// const StyledTableCell = styled(TableCell)(({ theme, status }) => ({
//   backgroundColor: status ? 'green' : 'red',
//   color: 'white',
// }));

const RoomCategorySection = ({ roomCategory }: RoomCategorySectionProps) => {
  const dates = roomCategory.inventory_calendar.map((inventory) => inventory.date);
  const getMonthYearLabels = (dates: string[]) => {
    const monthYearLabels: { label: string; span: number }[] = [];
    let currentMonth = getMonth(parseISO(dates[0]));
    let currentYear = getYear(parseISO(dates[0]));
    let span = 0;


    dates.forEach((date) => {
      const month = getMonth(parseISO(date));
      const year = getYear(parseISO(date));
      if (month === currentMonth && year === currentYear) {
        span += 1;
      } else {
        monthYearLabels.push({ label: format(parseISO(dates[span - 1]), 'MMMM yyyy'), span });
        currentMonth = month;
        currentYear = year;
        span = 1;
      }
    });
    monthYearLabels.push({ label: format(parseISO(dates[span - 1]), 'MMMM yyyy'), span });

    return monthYearLabels;
  };



  const monthYearLabels = getMonthYearLabels(dates);

  const isNotSellable = (date: string) => {
    const inventory = roomCategory.inventory_calendar.find(
      (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
    );
    return inventory && !inventory.status;
  };





  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {monthYearLabels.map((monthYear, index) => (
              <TableCell key={index} colSpan={monthYear.span} align="center">
                {monthYear.label}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            {dates.map((date, index) => (
              <TableCell key={index} align="center">
                {format(parseISO(date), 'EEE')}<br />
                {format(parseISO(date), 'dd')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={dates.length + 1} className='min-w-66 text-xl font-bold'>{roomCategory.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            {dates.map((date, index) => {
              const inventory = roomCategory.inventory_calendar.find(
                (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
              );
              return (
                <TableCell
                  key={index}
                  style={{
                   color:"white", backgroundColor: inventory && inventory.status ? 'green' : inventory && !inventory.status ? 'red' : 'transparent',
                  }}
                >
                  {inventory ? (inventory.status ? 'Sellable' : 'Close') : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>Rooms to Sell</TableCell>
            {dates.map((date, index) => {
              const inventory = roomCategory.inventory_calendar.find(
                (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
              );
              return (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                    color: inventory && !inventory.status ? 'white' : 'black',
                  }}
                >
                  {inventory ? inventory.available : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>Net Booked</TableCell>
            {dates.map((date, index) => {
              const inventory = roomCategory.inventory_calendar.find(
                (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
              );
              return (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                    color: inventory && !inventory.status ? 'white' : 'black',

                  }}
                >
                  {inventory ? inventory.booked : 'N/A'}
                </TableCell>
              );
            })}
          </TableRow>
          {roomCategory.rate_plans.map((ratePlan, ratePlanIndex) => (
            <React.Fragment key={ratePlan.id}>
              <TableRow>
                <TableCell className='min-w-56'> {ratePlan.name} 
                <TableCell colSpan={dates.length} className='text-blue-500'><PersonIcon /> <span className='px-1'>x</span>{roomCategory.occupancy}</TableCell>
                </TableCell>
               
                {dates.map((date, index) => {
                  const rateForDate = ratePlan.calendar.find(
                    (rate) => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  const inventory = roomCategory.inventory_calendar.find(
                    (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  return (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                        color: inventory && !inventory.status ? 'white' : 'black',
                        fontWeight: "500",
                      }}
                    >
                      {rateForDate ? rateForDate.rate : 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Min Length of Stay</TableCell>
                {dates.map((date, index) => {
                  const rateForDate = ratePlan.calendar.find(
                    (rate) => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  const inventory = roomCategory.inventory_calendar.find(
                    (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  return (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                      }}
                    >
                      {rateForDate ? rateForDate.min_length_of_stay ?? 'N/A' : 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Reservation Deadline</TableCell>
                {dates.map((date, index) => {
                  const rateForDate = ratePlan.calendar.find(
                    (rate) => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  const inventory = roomCategory.inventory_calendar.find(
                    (inv) => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
                  );
                  return (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                      }}
                    >
                      {rateForDate ? rateForDate.reservation_deadline ?? 'N/A' : 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
           
            </React.Fragment>
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default RoomCategorySection;