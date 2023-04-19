import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyTrips } from "../../managers/TripManager"
import Calendar from 'react-calendar'
import "./Calendar.css"
// import styled from 'styled-components'
// import 'react-calendar/dist/Calendar.css';

export function CalendarView({ token }) {

  // const { tripId } = useParams()
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate()
  const tokenInt = parseInt(token)

  useEffect(() => {
    getMyTrips(tokenInt).then((myTrips) => setTrips(myTrips))
  }, [tokenInt])

  const tripTileContent = ({ date, view }) => {
    if (view === 'month') {
      const tripOnDate = trips.find(trip =>
        new Date(trip.start_date) <= date && date <= new Date(trip.end_date)
      );
      return tripOnDate ? <p>{tripOnDate.title}</p> : null;
    }
  };

  const handleTileClick = () => {


  }

  return (
    <div className="calendar">

      <Calendar
        calendarType="US"
        defaultActiveStartDate={new Date()}
        selectRange={true}
        tileContent={tripTileContent}>
      </Calendar>
    </div >
  );
}





