import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';

import './modal.scss';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.modal);

  if (!isOpen) return null;

  return (
    <div class="modal" onClick={() => dispatch(closeModal())}>
      <div class="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;