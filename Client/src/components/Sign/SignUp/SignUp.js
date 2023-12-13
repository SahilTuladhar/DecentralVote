import { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import useInput from "../../../hooks/use-input";
import axios from "axios"
const SignUp = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredUsername,
    valueIsInvalid: usernameIsInvalid,
    valueIsValid: usernameIsValid,
    valueInputHandler: usernameInputHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useInput((value) => {
    return value && value.trim() !== "";
  });

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    valueIsInvalid: passwordIsInvalid,
    valueInputHandler: passwordInputHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => {
    return value && value.length >= 8;
  });

  const {
    value: enteredNewPassword,
    valueIsValid: newPasswordIsValid,
    valueIsInvalid: newPasswordIsInvalid,
    valueInputHandler: newPasswordInputHandler,
    valueBlurHandler: newPasswordBlurHandler,
    reset: newPasswordReset,
  } = useInput((value) => {
    return value && value.trim() === enteredPassword;
  });

  useEffect(() => {
    if (usernameIsValid && passwordIsValid && newPasswordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [usernameIsValid, passwordIsValid, newPasswordIsValid]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const newUserData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    onSubmitNewUser(newUserData);

    console.log(newUserData);
    usernameReset();
    passwordReset();
    newPasswordReset();
  };

  const onSubmitNewUser = async (event) => {
    
      const name = enteredUsername
      const password = enteredNewPassword


    try {
      const response = await axios.post("http://localhost:4000/user/signup", {
        name,
        password

      });
      
      window.location.href = "/landing-page";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${styles["signUpContainer"]} ${
        props.value === "signUp" ? styles.rightPanelActive : ""
      }`}
    >
      {" "}
      <h3>Decentral Vote</h3>
      <p>Vote responsibly</p>
      <h4>Welcome To Decentral Vote!!</h4>
      <h5>Please Sign-In to your account</h5>
      <form onSubmit={formSubmitHandler}>
        <div
          className={`${styles["formInputs"]} ${
            usernameIsInvalid || passwordIsInvalid || newPasswordIsInvalid
              ? styles.invalid
              : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameInputHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />

          {usernameIsInvalid && <p>Please enter Valid Username</p>}

          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />

          {passwordIsInvalid && <p>Please enter Valid Password</p>}

          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={newPasswordInputHandler}
            onBlur={newPasswordBlurHandler}
            value={enteredNewPassword}
          />

          {newPasswordIsInvalid && <p>Password does not match</p>}
        </div>

        <div className={styles.formActions}>
          <button className={styles.signUpButton} disabled={!formIsValid}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;