import React from 'react';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';

export function CalendarView() {

  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar">
      <CalendarContainer>

        <Calendar
          onChange={onChange}
          value={value}
          calendarType="US"
          defaultActiveStartDate={new Date()}
          selectRange={true}
          tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p></p> : null} tileClassName={({ date, view }) => view === 'month' && date.getDay() === 3 ? 'saturday' : null}
          hover={new Date()}>
        </Calendar>
      </CalendarContainer>
    </div>
  );
}

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  display: flex; 
  justify-content: center; 
  align-items: center; 
  max-width: 800px;
  background-color: #d4f7d4;
  padding: 10px;
  border-radius: 3px;

  /* ~~~ navigation styles ~~~ */
  .react-calendar { 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    align-content: center; 
    width: 500px; 
    
  }
  .react-calendar__navigation {
    display: flex;
    .react-calendar__navigation__label {
      font-weight: bold;
      width: 100%; 
    }
    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #6f876f;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 10px 5;
    &:hover {
      background-color: #556b55;
    }
    &:active {
      background-color: #a5c1a5;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid 
    grid-template-columns: 45% 45% 45% 45% 45% 45% 45%; 
    
    .react-calendar__tile {
      max-width: 100px;
    }
    .react-calendar__tile--range {
      box-shadow: 0 0 6px 2px black;
    }
  }
  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }
  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months, .react-calendar__decade-view__years, .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 25% 25% 25% 25% 25%;
    &.react-calendar__year-view__months {
      grid-template-columns: 40% 40% 40%;
    }
    
    .react-calendar__tile {
      max-width: 100%: 
    }
  }
`;




