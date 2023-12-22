// Datepicker.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const Datepicker = ({ initialDate, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (initialDate) {
      const parsedDate = new Date(initialDate);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    }
  }, [initialDate]);

  const handleDateChange = date => {
    // Ensure the date is a valid Date object
    if (!date || isNaN(date.getTime())) {
      setSelectedDate(null);
      onChange({ target: { name: 'dateOfBirth', value: '' } });
      return;
    }
  
    // Convert the date to a string in "MM/dd/yyyy" format
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  
    // Set the selected date in the state
    setSelectedDate(date);
  
    // Update the parent component with the formatted date
    onChange({ target: { name: 'dateOfBirth', value: formattedDate } });
  };
  
  

  return (
    <div>
      <DatePicker
         className='DatePicker'
       // className="bg-[#f2f2f2] rounded-2xl border border-gray-300  xl:w-[120px] text-black py-0.5  text-xs"
        selected={selectedDate}
        onChange={handleDateChange}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
};

export default Datepicker;
