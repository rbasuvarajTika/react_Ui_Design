// Datepicker.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const DatepickerDebridedDate = ({ initialDate, onChange }) => {
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
    setSelectedDate(date);
    // Format the date to "MM/dd/yyyy" before passing it to the parent component
    const formattedDate = date ? `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}` : '';
    onChange({ target: { name: 'debridedDate', value: formattedDate } });
  };

  return (
    <div>
      <DatePicker
        className='DatePicker'
        selected={selectedDate}
        onChange={handleDateChange}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
};

export default DatepickerDebridedDate;
