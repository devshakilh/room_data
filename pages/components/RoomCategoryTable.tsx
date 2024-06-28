
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format, parseISO, getMonth, getYear } from 'date-fns';
import { IRoomCategory } from '../types/IRoomCategory';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';


interface RoomCategoryTableProps {
  roomCategories: IRoomCategory[];
}

const RoomCategoryTable: React.FC<RoomCategoryTableProps> = ({ roomCategories }) => {
  // Function to extract unique month-year labels and their spans
  const getMonthYearLabels = (dates: string[]) => {
    const monthYearLabels: { label: string; span: number }[] = [];
    if (dates.length === 0) {
      return monthYearLabels;
    }

    let currentMonth = getMonth(parseISO(dates[0]));
    let currentYear = getYear(parseISO(dates[0]));
    let span = 0;

    dates.forEach(date => {
      const parsedDate = parseISO(date);
      if (parsedDate) {
        const month = getMonth(parsedDate);
        const year = getYear(parsedDate);
        if (month === currentMonth && year === currentYear) {
          span += 1;
        } else {
          monthYearLabels.push({ label: `${format(parsedDate, 'MMMM yyyy')}`, span });
          currentMonth = month;
          currentYear = year;
          span = 1;
        }
      }
    });

    // Push the last accumulated month-year label
    monthYearLabels.push({ label: `${format(parseISO(dates[dates.length - 1]), 'MMMM yyyy')}`, span });

    return monthYearLabels;
  };

  // Extract dates from the first room category (assuming all have the same dates)
  const dates = roomCategories.length > 0 ? roomCategories[0].inventory_calendar.map(inv => inv.date) : [];

  // Calculate month-year labels
  const monthYearLabels = getMonthYearLabels(dates.filter(date => date)); // Filter out undefined dates

  return (
    
  <TableContainer component={Paper} className=' bg-white rounded-2xl m-10 ' >
      <Table>
        <TableHead >
          <TableRow >
            <TableCell></TableCell>
            {dates.map((date, index) => (
              <React.Fragment key={index} >
                {index === 0 || !monthYearLabels[index] || monthYearLabels[index].label !== monthYearLabels[index - 1].label ? (
                  <TableCell  colSpan={monthYearLabels[index]?.span} >
                    {monthYearLabels[index]?.label}
                  </TableCell>
                ) : null}
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            {dates.map((date, index) => (
              <TableCell key={index} className='top_position'>
                {format(parseISO(date), 'EEE')}<br />
                {format(parseISO(date), 'dd')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody >
          {roomCategories.map((roomCategory, rcIndex) => (
            <React.Fragment key={rcIndex}>
              <TableRow>
                <TableCell colSpan={dates.length + 1} className='min-w-66 text-xl font-bold container'>
                <div>
                  <span>  {roomCategory.name}</span> <button className='bg-orange-500 font-bold px-4 py-2 text-white ml-[125vh] rounded-md'><AddIcon className='font-bold'/> <span className='font-medium text-[18px]'>BULK EDIT</span></button>
                </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='container'>Status</TableCell>
                {dates.map((date, index) => {
                  const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
                  return (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: inventory && !inventory.status ? 'red' : 'green',
                        color: 'white',
                      }}
                    >
                      {inventory ? (inventory.status ? 'Sellable' : 'Close') : 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className='container'>Rooms to Sell</TableCell>
                {dates.map((date, index) => {
                  const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
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
                <TableCell className='container'>Net Booked</TableCell>
                {dates.map((date, index) => {
                  const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
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
              {roomCategory.rate_plans.map((ratePlan, rpIndex) => (
                <React.Fragment key={rpIndex}>
                  <TableRow>
                    <TableCell className='min-w-56 container'>{ratePlan.name}
                    <TableCell colSpan={dates.length} className='text-blue-500'><PersonIcon /> <span className='px-1'>x</span>{roomCategory.occupancy}</TableCell>
                    </TableCell>
                    {dates.map((date, index) => {
                      const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
                      const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
                      return (
                        <TableCell
                          key={index}
                          style={{
                            backgroundColor: inventory && !inventory.status ? 'red' : 'transparent',
                            color: inventory && !inventory.status ? 'white' : 'black',
                            fontWeight: '500',
                          }}
                        >
                          {rateForDate ? rateForDate.rate : 'N/A'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell className='container'>Min Length of Stay</TableCell>
                    {dates.map((date, index) => {
                      const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
                      const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
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
                    <TableCell className='container'>Reservation Deadline</TableCell>
                    {dates.map((date, index) => {
                      const rateForDate = ratePlan.calendar.find(rate => format(parseISO(rate.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
                      const inventory = roomCategory.inventory_calendar.find(inv => format(parseISO(inv.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd'));
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
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default RoomCategoryTable;
