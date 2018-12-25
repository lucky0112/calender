import React from 'react';
import queryString from 'query-string';
import _get from 'lodash/get';
import dateFns from 'date-fns';

const RenderCells = ({ selectedDate }) => {
    const currentMonth = selectedDate;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const CalenderHeader = ({ onNexMonthClick, onPrevMonthClick, setDate }) => {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={onPrevMonthClick}>chevron_left</div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(setDate, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={onNexMonthClick}>chevron_right</div>
        </div>
      </div>
    );
  }

const RenderDays = ({ setDate }) => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(setDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

const CalenderGrid = ({ 
    location, 
    selectedMonth, 
    selectedYear,
    nextMonthHandler,
    prevMonthHandler,
    selectedDate 
}) => {
    const values = queryString.parse(location.search);
    const month = _get(values,'month',selectedMonth);
    const year = _get(values,'year',selectedYear);
    const setDate = dateFns.setDate(new Date(year,month,selectedDate),selectedDate);
    return (
        <div className="calendar">
            <CalenderHeader 
                onNexMonthClick={nextMonthHandler}
                onPrevMonthClick={prevMonthHandler}
                setDate={setDate}
            />
            <RenderDays setDate={setDate}/>
            <RenderCells selectedDate={setDate}/>
        </div>
    )
}


export default CalenderGrid;