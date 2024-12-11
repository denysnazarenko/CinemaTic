import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { closeModal } from '../Modal/modalSlice';

import './loginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  const { request } = useHttp();

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const validInput = input.replace(/[^a-zA-Z0-9]/g, '');
    setUserPassword(validInput);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const users = await request("http://localhost:3001/users");

      const user = users.find(
        (u) => u.email === userEmail && u.password === userPassword
      );

      if (user) {
        setLoginError(false);
        setUserEmail('');
        setUserPassword('');
        dispatch(closeModal());
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoginError(true);
    }

    // const storedUser = JSON.parse(localStorage.getItem('user'));

    // if (storedUser) {
    //   if (storedUser.email !== userEmail) {
    //     setEmailError(true);
    //   } else {
    //     setEmailError(false);
    //   }

    //   if (storedUser.password !== userPassword) {
    //     setPasswordError(true);
    //   } else {
    //     setPasswordError(false);
    //   }

    //   if (storedUser.email === userEmail && storedUser.password === userPassword) {
    //     const userLogin = {
    //       email: userEmail,
    //       password: userPassword
    //     };

    //     localStorage.setItem('userLogin', JSON.stringify(userLogin));

    //     setUserEmail('');
    //     setUserPassword('');
    //     dispatch(closeModal());
    //   }
    // } else {
    //   setEmailError(true);
    //   setPasswordError(true);
    // }
  }

  return (
    <form className="form__login login-form" onSubmit={onSubmitHandler}>
      <div className="login-form__close" onClick={() => dispatch(closeModal())}>&times;</div>
      <h2 className="login-form__title">Вхід</h2>
      <div className="login-form__email">
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
        {/* {emailError && <span className="login-form__error-message">Неправильний email</span>} */}
      </div>
      <div className="login-form__password">
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
        {/* {passwordError && <span className="login-form__error-message">Неправильний пароль</span>} */}
      </div>
      {loginError && <span className="login-form__error-message">Неправильна пошта чи пароль</span>}
      <button type="submit" className="login-form__submit">Увійти</button>
    </form>
  )
}

export default LoginForm;