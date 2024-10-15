import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { closeModal } from '../Modal/modalSlice';

import './registerForm.scss';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const onPhoneChange = (e) => {
    const input = e.target.value;
    const validInput = input.replace(/[^0-9]/g, '');
    setUserPhone(validInput);
  };

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const validInput = input.replace(/[^a-zA-Z0-9]/g, '');
    setUserPassword(validInput);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      id: uuidv4(),
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword
    };

    localStorage.setItem('user', JSON.stringify(newUser));

    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserPassword('');
    dispatch(closeModal());
  }

  return (
    <form className="form__register register-form" onSubmit={onSubmitHandler}>
      <div className="register-form__close" onClick={() => dispatch(closeModal())}>&times;</div>
      <h2 className="register-form__title">Реєстрація</h2>
      <div className="register-form__name">
        <label htmlFor="name">Прізвище та ім'я</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="Прізвище та ім'я"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="register-form__email">
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="register-form__phone">
        <label htmlFor="phone">Номер телефона</label>
        <input
          required
          type="tel"
          name="phone"
          id="phone"
          placeholder="+380999999999"
          value={userPhone}
          onChange={onPhoneChange}
        />
      </div>
      <div className="register-form__password">
        <label htmlFor="password">Пароль</label>
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={userPassword}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit" className="register-form__submit">Створити акаунт</button>
    </form>
  )
}

export default RegisterForm;