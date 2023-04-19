import React from 'react';
import { useState, useEffect } from 'react';
import { getMyTrips } from "../../managers/TripManager"
import Calendar from 'react-calendar'
import "./Calendar.css"
// import styled from 'styled-components'
// import 'react-calendar/dist/Calendar.css';

export function CalendarView({token}) {

  const [trips, setTrips] = useState([{

  }]);

  useEffect(() => {
    getMyTrips().then((myTrips) => setTrips(myTrips))
  })

  const tripTileContent = ({ date, view }) => {
    if (view === 'month') {
      const tripOnDate = trips.find(trip =>
        new Date(trip.start_date) <= date && date <= new Date(trip.end_date)
      );
      return tripOnDate ? <p>{tripOnDate.title}</p> : null;
    }
  };

  return (
    <div className="calendar">

      <Calendar
        calendarType="US"
        defaultActiveStartDate={new Date()}
        selectRange={true}
        tileContent={tripTileContent}
        tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'sunday' : null} >
      </Calendar>
    </div >
  );
}





