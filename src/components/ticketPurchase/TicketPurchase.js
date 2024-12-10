import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../Modal/modalSlice';
import { resetSelection } from '../ticketDateTimePicker/TicketDateTimeSlice';

import './ticketPurchase.scss';

const TicketPurchase = () => {
  const { movieData } = useSelector(state => state.movieDetails);
  const { selectedDay, selectedTime, price } = useSelector(state => state.ticketDateTime)
  const dispatch = useDispatch();

  const ticketPurchaseFinished = () => {
    dispatch(resetSelection())
    dispatch(closeModal())
  }

  const { title } = movieData
  return (
    <section className="ticket__purchase purchase-ticket">
      <div className="purchase-ticket__close" onClick={() => dispatch(closeModal())}>&times;</div>
      <h3 className="purchase-ticket__title">
        Придбання квитка на фільм "{title}"
      </h3>
      <div className="purchase-ticket__date">Дата: {selectedDay}</div>
      <div className="purchase-ticket__time">Час: {selectedTime}</div>
      <div className="purchase-ticket__price">Ціна: {price}</div>
      <button className="purchase-ticket__button" onClick={ticketPurchaseFinished}>Завершити придбання</button>
    </section>
  )
}

export default TicketPurchase;