import React, { useState, useEffect, useCallback } from 'react';
import Style from "./Login.module.scss";
import { history } from '../../Router';

const defaultCredentials = require("../../credentials.json");

const Login = () => {
  const [isDisabled, updateValidation] = useState(true);
  const [credentials, updateCredentials] = useState({
    email: "",
    password: ""
  });

  const validation = useCallback(() => {
    if (defaultCredentials.email === credentials.email && defaultCredentials.password === credentials.password) {
      updateValidation(false)
    }
  }, [credentials.email, credentials.password])

  useEffect(() => {
    validation()
  }, [credentials, validation])

  const Login = () => {
    history.push("/feed")
  }

  return (
    <div className={Style.container}>
      <h1>Welcome to Ubeya feed app</h1>
      <form className={Style.form_container}>
        <label>Email:</label>
        <input
          className={Style.input}
          value={credentials.email}
          type="email"
          name="email"
          onChange={e => updateCredentials({
            ...credentials,
            [e.currentTarget.name]: e.currentTarget.value
          })}
        />
        <label>password:</label>
        <input
          className={Style.input}
          value={credentials.password}
          type="password"
          name="password"
          onChange={e => updateCredentials({
            ...credentials,
            [e.currentTarget.name]: e.currentTarget.value
          })}
        />
        <button onClick={Login} disabled={isDisabled}>Login</button>
      </form>
    </div>
  );
};

export default Login;