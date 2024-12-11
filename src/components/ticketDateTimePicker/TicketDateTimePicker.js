import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay, setSelectedTime } from './TicketDateTimeSlice';
import { openModal } from '../Modal/modalSlice';

import './ticketDateTimePicker.scss';

const TicketDateTimePicker = () => {
  const [days, setDays] = useState([]);
  const [price, setPrice] = useState(() => Math.floor(Math.random() * (199 - 149 + 1)) + 149.99);
  const dispatch = useDispatch();
  const { selectedDay, selectedTime } = useSelector(state => state.ticketDateTime)

  const hours = ['11:00', '13:10', '15:40', '17:00', '18:15', '22:00'];
  const weekDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const monthsWithGenitive = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];

  useEffect(() => {
    const generatedDays = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      generatedDays.push({ dayMont: day.getDate(), dayWeek: day.getDay(), Month: day.getMonth() });
    }
    setDays(generatedDays);
  }, [])

  const renderDays = (days, monthsWithGenitive, weekDays, selectedDay) => {
    return days.map(({ dayMont, dayWeek, Month }, index) => {
      const dayWithMonth = `${dayMont} ${monthsWithGenitive[Month]}`;
      return (
        <li key={index} className={`days-time__item ${dayWithMonth == selectedDay ? "days-time__item-active" : ""}`} onClick={() => dispatch(setSelectedDay({ dayWithMonth, price }))}>{dayMont}<br />{weekDays[dayWeek]}</li>
      )
    })
  }

  const renderHours = (hours, selectedTime) => {
    return hours.map((time, index) => {
      return (
        <div key={index} className={`hours-time__item ${time == selectedTime ? "hours-time__item-active" : ""}`} onClick={() => dispatch(setSelectedTime(time))}>{time}</div>
      )
    })
  }

  const openTicketPurchaseModal = () => {
    dispatch(openModal('ticketPurchase'));
  }

  const daysList = renderDays(days, monthsWithGenitive, weekDays, selectedDay);

  const hoursList = renderHours(hours, selectedTime);

  return (
    <section className="time">
      <div className="time__container">
        <h3 className="time__title">Оберіть дату:</h3>
        <div className="time__days days-time">
          <ul className="days-time__list">
            {daysList}
          </ul>
        </div>
        <div className="time__hours hours-time">
          <ul className="hours-time__list">
            {hoursList}
          </ul>
        </div>
        <h3 className="time__title">Ціна: {price}</h3>
        <button
          className={`time__button ${!selectedDay || !selectedTime ? 'time__button-disabled' : ''}`}
          disabled={!selectedDay || !selectedTime}
          onClick={openTicketPurchaseModal}
        >Придбати квиток</button>
      </div>
    </section>
  )
}

export default TicketDateTimePicker;