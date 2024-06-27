import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

interface DateRangePickerProps {
  onDateChange: (dateRange: [string | null, string | null]) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      onDateChange([dateString, selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : null]);
    } else {
      onDateChange([null, selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : null]);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      onDateChange([selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : null, dateString]);
    } else {
      onDateChange([selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : null, null]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <div className='data_filed mt-8 flex gap-3 items-center'>
     <div>
        <DatePicker
          date={selectedStartDate}
          onChange={(date) => handleStartDateChange(date)}
          renderInput={(params) => <TextField {...params} label="Start Date" />}
        />
      </div>
      <p>to</p>
      <div>
        <DatePicker
          date={selectedEndDate}
          onChange={(date) => handleEndDateChange(date)}
          renderInput={(params) => <TextField {...params} label="End Date" />}
        />
      </div>
     </div>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
