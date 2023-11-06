// Datepicker.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css'; 
const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker className='DatePicker' selected={selectedDate} onChange={handleDateChange}  showYearDropdown
        scrollableYearDropdown/>
    </div>
  );
};

export default Datepicker;
