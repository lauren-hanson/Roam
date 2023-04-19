import React from 'react';
import { useState, useEffect } from 'react';
import { getMyTrips } from "../../managers/TripManager"
import Calendar from 'react-calendar'
import "./Calendar.css"
// import styled from 'styled-components'
// import 'react-calendar/dist/Calendar.css';

export function CalendarView() {

  const [value, onChange] = useState([{
    
  }]);

  useEffect(() => { 
    getMyTrips().then((myTrips) => onChange(myTrips))
  })

  return (
    <div className="calendar">
      {/* <CalendarContainer> */}

        <Calendar
          onChange={onChange}
          value={value.start_date}
          calendarType="US"
          defaultActiveStartDate={new Date()}
          selectRange={true}
          tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p></p> : null} tileClassName={({ date, view }) => view === 'month' && date.getDay() === 3 ? 'saturday' : null}
          hover={new Date()}>
        </Calendar>
      {/* </CalendarContainer> */}
    </div>
  );
}





