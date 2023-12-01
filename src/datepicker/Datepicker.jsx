// Datepicker.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const Datepicker = ({ initialDate, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log('initialDate:', initialDate);
  
    if (initialDate) {
      const parsedDate = new Date(initialDate);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    }
  }, [initialDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
    onChange({ target: { name: 'dateOfBirth', value: date ? date.toLocaleDateString('en-US') : '' } });
  };

  return (
    <div>
      <DatePicker
        className='DatePicker'
        selected={selectedDate}
        onChange={handleDateChange}
        
      />
    </div>
  );
};

export default Datepicker;
